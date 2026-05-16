#!/usr/bin/env node

/**
 * Backup Obsidian docs folder to Google Drive
 * Creates a timestamped zip file in ./backups/ directory
 *
 * Usage: node scripts/backup-docs.js
 * Or: npm run backup:docs
 *
 * For scheduled backups, add to crontab:
 * 0 2 * * * cd /path/to/project && npm run backup:docs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, '../docs');
const BACKUPS_DIR = path.join(__dirname, '../.backups');

function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
}

async function createBackup() {
  try {
    // Ensure backups directory exists
    if (!fs.existsSync(BACKUPS_DIR)) {
      fs.mkdirSync(BACKUPS_DIR, { recursive: true });
    }

    const timestamp = getTimestamp();
    const backupName = `docs-backup-${timestamp}.zip`;
    const backupPath = path.join(BACKUPS_DIR, backupName);

    console.log(`📦 Creating backup: ${backupName}`);

    // Create zip file
    const output = fs.createWriteStream(backupPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        const sizeKB = (archive.pointer() / 1024).toFixed(2);
        console.log(`✅ Backup created successfully (${sizeKB} KB)`);
        console.log(`📁 Location: ${backupPath}`);
        console.log(`\n📤 Next step: Upload to Google Drive with:`);
        console.log(`   Then run: npx @anthropic-ai/sdk drive upload ${backupPath}`);
        resolve(backupPath);
      });

      archive.on('error', (err) => {
        console.error('❌ Backup failed:', err.message);
        reject(err);
      });

      archive.pipe(output);
      archive.directory(DOCS_DIR, 'docs');
      archive.finalize();
    });
  } catch (error) {
    console.error('❌ Error creating backup:', error.message);
    process.exit(1);
  }
}

// Cleanup old backups (keep last 5)
function cleanupOldBackups() {
  try {
    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.startsWith('docs-backup-') && f.endsWith('.zip'))
      .sort()
      .reverse();

    if (files.length > 5) {
      const toDelete = files.slice(5);
      toDelete.forEach(file => {
        const filePath = path.join(BACKUPS_DIR, file);
        fs.unlinkSync(filePath);
        console.log(`🗑️  Cleaned up old backup: ${file}`);
      });
    }
  } catch (error) {
    console.warn('⚠️  Cleanup warning:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting Obsidian docs backup...\n');

  // Check if docs directory exists
  if (!fs.existsSync(DOCS_DIR)) {
    console.error('❌ docs/ directory not found');
    process.exit(1);
  }

  try {
    await createBackup();
    cleanupOldBackups();
    console.log('\n✨ Backup process completed!');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
