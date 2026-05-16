#!/usr/bin/env node

/**
 * Send Gmail notification when backup completes
 * Usage: Called by backup-docs.js after successful backup
 *
 * Requires Gmail API OAuth setup:
 * 1. Ask Claude Code: "Send me a Gmail notification about the backup"
 * 2. Or manually via Google Workspace settings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKUPS_DIR = path.join(__dirname, '../.backups');

function getLatestBackupInfo() {
  try {
    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.startsWith('docs-backup-') && f.endsWith('.zip'))
      .sort()
      .reverse();

    if (files.length === 0) return null;

    const latestFile = files[0];
    const stats = fs.statSync(path.join(BACKUPS_DIR, latestFile));

    return {
      filename: latestFile,
      size: formatFileSize(stats.size),
      time: new Date(stats.mtimeMs).toLocaleString(),
    };
  } catch (error) {
    console.error('Error reading backups:', error.message);
    return null;
  }
}

function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}

function createEmailContent() {
  const backup = getLatestBackupInfo();

  if (!backup) {
    return {
      subject: '❌ Obsidian Backup Failed',
      body: 'The backup script ran but no backup file was found.',
    };
  }

  const emailBody = `
📦 Obsidian Backup Complete

File: ${backup.filename}
Size: ${backup.size}
Time: ${backup.time}

✅ Your docs/ folder has been backed up successfully.

Next step: Upload to Google Drive in your "Obsidian Backups" folder.

Ask Claude Code: "Upload the latest Obsidian backup to my Drive"
  `.trim();

  return {
    subject: `✅ Obsidian Backup Complete (${backup.size})`,
    body: emailBody,
  };
}

async function notifyViaClaudeCode() {
  const { subject, body } = createEmailContent();

  console.log('\n📧 Email Notification:');
  console.log(`Subject: ${subject}`);
  console.log(`\n${body}`);
  console.log('\n💡 To send this via Gmail:');
  console.log('   Ask Claude Code: "Send a Gmail notification: [copy the text above]"');
}

// Main
notifyViaClaudeCode().catch(console.error);
