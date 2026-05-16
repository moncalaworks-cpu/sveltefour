#!/usr/bin/env node

/**
 * Upload latest backup to Google Drive
 * Note: This script finds the backup file and provides upload instructions
 * since Google Drive MCP is managed by Claude Code, not standalone scripts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKUPS_DIR = path.join(__dirname, '../.backups');

function findLatestBackup() {
  try {
    if (!fs.existsSync(BACKUPS_DIR)) {
      console.error('❌ No backups directory found. Run "npm run backup:docs" first.');
      process.exit(1);
    }

    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.startsWith('docs-backup-') && f.endsWith('.zip'))
      .sort()
      .reverse();

    if (files.length === 0) {
      console.error('❌ No backup files found. Run "npm run backup:docs" first.');
      process.exit(1);
    }

    return {
      filename: files[0],
      path: path.join(BACKUPS_DIR, files[0]),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error finding backup:', error.message);
    process.exit(1);
  }
}

function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}

async function main() {
  console.log('📤 Finding latest backup...\n');

  const backup = findLatestBackup();
  const stats = fs.statSync(backup.path);

  console.log('📁 Latest Backup Found:');
  console.log(`   File: ${backup.filename}`);
  console.log(`   Size: ${formatFileSize(stats.size)}`);
  console.log(`   Path: ${backup.path}`);

  console.log('\n📤 Upload Options:\n');

  console.log('Option 1: Upload via Claude Code (Recommended)');
  console.log('   From Claude Code, ask Claude to upload this backup:');
  console.log(`   "Upload ${backup.filename} to Google Drive to my Obsidian Backups folder"\n`);

  console.log('Option 2: Create folder structure in Drive first');
  console.log('   1. Create a folder "Obsidian Backups" in your Google Drive');
  console.log('   2. Ask Claude Code: "Upload the backup to Drive > Obsidian Backups folder"\n');

  console.log('Option 3: Use Google Drive CLI (if installed)');
  console.log(`   $ gdrive upload ${backup.path}\n`);

  console.log('💡 Tip: You can automate backups using cron or system scheduler:');
  console.log('   Edit crontab: crontab -e');
  console.log('   Add line: 0 2 * * * cd ' + path.dirname(BACKUPS_DIR) + ' && npm run backup:docs');
  console.log('   (This runs backup daily at 2:00 AM)\n');
}

main().catch(console.error);
