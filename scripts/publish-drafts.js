#!/usr/bin/env node

/**
 * Draft Publisher
 *
 * Moves approved drafts from content/drafts branch to main
 * and updates metadata to mark as published
 *
 * Usage: node scripts/publish-drafts.js [filenames...]
 * If no filenames provided, publishes all drafts with [generated] prefix
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const postsDir = path.resolve(projectRoot, 'src/posts');

/**
 * Format markdown metadata
 */
function updatePostMetadata(content) {
	// Change status from draft to published
	let updated = content.replace(/^status: draft\n/m, `status: published\n`);

	// Add publishedAt timestamp
	const now = new Date().toISOString();
	updated = updated.replace(/^isGenerated: true\n/m, `isGenerated: true\npublishedAt: "${now}"\n`);

	// Update title to remove [generated] prefix once approved
	const titleMatch = updated.match(/^title: "\[Curated\]/m);
	if (titleMatch) {
		// Keep the [Curated] tag, it's part of the brand
		return updated;
	}

	return updated;
}

/**
 * Get list of draft files
 */
function getDrafts() {
	if (!fs.existsSync(postsDir)) {
		console.error('❌ Posts directory not found');
		return [];
	}

	return fs
		.readdirSync(postsDir)
		.filter((file) => file.startsWith('[generated]-') && file.endsWith('.md'))
		.map((file) => ({
			filename: file,
			filepath: path.join(postsDir, file)
		}));
}

/**
 * Publish draft
 */
function publishDraft(draftFile) {
	const { filename, filepath } = draftFile;

	// Read content
	const content = fs.readFileSync(filepath, 'utf-8');

	// Update metadata
	const updated = updatePostMetadata(content);

	// Write back
	fs.writeFileSync(filepath, updated, 'utf-8');

	// Commit to main
	try {
		execSync(`git add ${filepath}`, { cwd: projectRoot });
		const message = `blog: Publish curated content — ${filename}`;
		execSync(`git commit -m "${message}"`, { cwd: projectRoot });

		console.log(`✅ Published: ${filename}`);
		return true;
	} catch (error) {
		console.error(`❌ Failed to publish ${filename}:`, error.message);
		return false;
	}
}

/**
 * Main function
 */
async function main() {
	const args = process.argv.slice(2);

	console.log('\n📤 Draft Publisher\n');

	// Get drafts to publish
	let draftsToPublish = [];

	if (args.length > 0) {
		// Publish specific files
		draftsToPublish = args.map((filename) => ({
			filename,
			filepath: path.join(postsDir, filename)
		}));
	} else {
		// Publish all available drafts
		draftsToPublish = getDrafts();
	}

	if (draftsToPublish.length === 0) {
		console.warn('⚠️  No drafts found to publish.');
		console.log('\nUsage:');
		console.log('  npm run publish-drafts              (all drafts)');
		console.log('  npm run publish-drafts file1.md     (specific file)\n');
		process.exit(0);
	}

	console.log(`Found ${draftsToPublish.length} draft(s) to publish:\n`);

	let published = 0;
	let failed = 0;

	for (const draft of draftsToPublish) {
		console.log(`📝 ${draft.filename}`);

		if (!fs.existsSync(draft.filepath)) {
			console.error(`   ❌ File not found: ${draft.filepath}`);
			failed++;
			continue;
		}

		// Show preview
		const content = fs.readFileSync(draft.filepath, 'utf-8');
		const titleMatch = content.match(/^title: "(.+)"/m);
		const title = titleMatch ? titleMatch[1] : 'Untitled';
		console.log(`   Title: ${title}`);

		// Publish
		if (publishDraft(draft)) {
			published++;
		} else {
			failed++;
		}
	}

	console.log(`\n📊 Results:`);
	console.log(`   ✅ Published: ${published}`);
	if (failed > 0) {
		console.log(`   ❌ Failed: ${failed}`);
	}

	if (published > 0) {
		console.log(`\n🎉 Success! New posts are now live on your blog.`);
		console.log(`\n📍 Next Steps:`);
		console.log(`   1. Verify posts appear on your blog`);
		console.log(`   2. Check blog homepage for latest posts`);
		console.log(`   3. Optionally push to production: git push origin main\n`);
	}

	process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
	console.error('❌ Error:', error.message);
	process.exit(1);
});
