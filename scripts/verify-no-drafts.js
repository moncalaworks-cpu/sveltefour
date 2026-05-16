#!/usr/bin/env node

/**
 * Vercel Deployment Guard: Prevent Draft Posts from Going Live
 *
 * This script runs during the Vercel build and fails the build if any
 * draft posts are found in src/posts/
 *
 * Usage: npm run verify:no-drafts (runs automatically in Vercel build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const postsDir = path.resolve(projectRoot, 'src', 'posts');

console.log('🛡️  Vercel Deployment Guard: Checking for draft posts...\n');

if (!fs.existsSync(postsDir)) {
	console.log('✅ No posts directory found (this is OK)');
	process.exit(0);
}

const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'));

if (files.length === 0) {
	console.log('✅ No posts found');
	process.exit(0);
}

let hasDrafts = false;
const draftFiles = [];

// Check each post for draft status
for (const file of files) {
	const filePath = path.join(postsDir, file);
	const content = fs.readFileSync(filePath, 'utf-8');

	// Check for draft status in frontmatter
	if (content.includes('status: draft') || content.match(/^status:\s*draft/m)) {
		hasDrafts = true;
		draftFiles.push(file);
	}
}

if (hasDrafts) {
	console.error('❌ BUILD FAILED: Found draft posts that cannot be deployed to production:\n');
	draftFiles.forEach((file) => {
		console.error(`   ✗ ${file}`);
	});

	console.error('\n📋 To fix this:\n');
	console.error('   1. Locally: Change "status: draft" to "status: published"');
	console.error('   2. Locally: Commit and push the changes');
	console.error('   3. Vercel: Build will pass on next deploy\n');

	console.error('⚠️  This is a safety guard to prevent unreviewed content from going live.\n');

	process.exit(1);
} else {
	console.log(`✅ All ${files.length} post(s) are approved for deployment`);
	console.log('🚀 Build proceeding to deployment...\n');
	process.exit(0);
}
