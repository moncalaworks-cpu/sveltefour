#!/usr/bin/env node

/**
 * Content Draft Generator
 *
 * Searches for relevant YouTube videos, articles, and podcasts
 * Generates blog post drafts with auto-generated summaries and citations
 *
 * Usage: node scripts/generate-draft.js [topicId]
 * If no topicId provided, generates for all enabled topics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const configPath = path.resolve(projectRoot, 'src/lib/config/content-sources.json');
const postsDir = path.resolve(projectRoot, 'src/posts');

// Simple date formatting
const formatDate = (date) => date.toISOString().split('T')[0];
const today = formatDate(new Date());

// Read config
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

/**
 * Generate a slug from title
 */
function generateSlug(title) {
	return title
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

/**
 * Create a blog post markdown file
 */
function createBlogPost(topic, sources) {
	const timestamp = new Date().toISOString();
	const slug = `[generated]-${topic.id}-${today}`;
	const filename = `${slug}.md`;
	const filepath = path.join(postsDir, filename);

	// Build sources section
	const sourcesSection = sources
		.map((source, idx) => {
			const icon = getSourceIcon(source.type);
			const metadata = getSourceMetadata(source);
			return `${idx + 1}. ${icon} [${source.title}](${source.url}) — ${metadata}`;
		})
		.join('\n');

	// Generate summary (placeholder - in real implementation, use AI/API)
	const summary = `
This curated collection brings together the latest and most relevant resources on ${topic.name}.
Whether you're looking to stay updated on industry trends, learn new techniques, or discover
innovative approaches, these sources provide valuable insights from thought leaders and practitioners.

${sources.length} quality resources across videos, articles, and podcasts to expand your knowledge.
`.trim();

	// Create markdown content
	const content = `---
title: "[Curated] ${topic.name} — ${today}"
slug: "${slug}"
date: "${today}"
status: draft
description: "Curated collection of the latest resources on ${topic.name}. Videos, articles, and podcasts from industry leaders and practitioners."
tags: [${topic.keywords.slice(0, 3).map((k) => `"${k}"`).join(', ')}]
author: "Ken Shinzato"
isGenerated: true
generatedAt: "${timestamp}"
---

# [Curated] ${topic.name} — ${today}

## Overview

${summary}

## Resources

${sourcesSection}

## How to Use These Resources

- **Videos** are great for visual learners and quick overviews (15-60 min)
- **Articles** provide detailed explanations and step-by-step guides
- **Podcasts** are perfect for learning while commuting or multitasking

Pick the format that works best for your learning style and schedule.

## What's Next?

Have you checked out any of these resources? I'd love to hear what you learned or which ones were most helpful. Share your thoughts on LinkedIn or in the comments below.
`;

	// Ensure posts directory exists
	if (!fs.existsSync(postsDir)) {
		fs.mkdirSync(postsDir, { recursive: true });
	}

	// Write file
	fs.writeFileSync(filepath, content, 'utf-8');
	console.log(`✅ Created draft: ${filename}`);

	return {
		filename,
		filepath,
		topic: topic.name,
		sourceCount: sources.length
	};
}

/**
 * Get icon for source type
 */
function getSourceIcon(type) {
	const icons = {
		youtube: '📹',
		article: '📄',
		podcast: '🎙️'
	};
	return icons[type] || '📌';
}

/**
 * Get metadata string for source
 */
function getSourceMetadata(source) {
	const parts = [];

	if (source.source) parts.push(source.source);
	if (source.date) parts.push(`${source.date}`);
	if (source.views) parts.push(`${source.views} views`);
	if (source.duration) parts.push(`${source.duration}`);

	return parts.join(' • ') || 'Source';
}

/**
 * Simulate content search (placeholder)
 * In real implementation, this would call WebSearch API
 */
function searchContent(topic) {
	// Mock data for demonstration
	// In production, replace with actual API calls to:
	// - YouTube Data API
	// - Dev.to API
	// - Hashnode API
	// - Medium RSS
	// - Podcast APIs

	const mockSources = {
		'qa-testing': [
			{
				title: 'Playwright vs Selenium: Modern Test Automation in 2026',
				url: 'https://example.com/playwright-selenium-2026',
				type: 'article',
				source: 'Dev.to',
				date: 'May 15, 2026',
				views: null
			},
			{
				title: 'Building Robust Test Automation Frameworks',
				url: 'https://www.youtube.com/watch?v=example1',
				type: 'youtube',
				source: 'YouTube',
				duration: '45 min',
				views: '12K'
			},
			{
				title: 'The Testing Podcast - Episode 156: AI in QA',
				url: 'https://example.com/podcast-ep156',
				type: 'podcast',
				source: 'Testing Podcast',
				date: 'May 14, 2026'
			},
			{
				title: 'Test Automation Best Practices 2026',
				url: 'https://example.com/test-automation-2026',
				type: 'article',
				source: 'Hashnode',
				date: 'May 13, 2026'
			},
			{
				title: 'Advanced Selenium Techniques',
				url: 'https://www.youtube.com/watch?v=example2',
				type: 'youtube',
				source: 'YouTube',
				duration: '1 hr 20 min',
				views: '8.5K'
			}
		],
		'ai-qa': [
			{
				title: 'AI-Powered Test Generation: The Future of QA',
				url: 'https://example.com/ai-test-generation',
				type: 'article',
				source: 'Medium',
				date: 'May 16, 2026'
			},
			{
				title: 'Machine Learning Models for Test Automation',
				url: 'https://www.youtube.com/watch?v=example3',
				type: 'youtube',
				source: 'YouTube',
				duration: '38 min',
				views: '6.2K'
			},
			{
				title: 'DevOps & AI - Episode 42: Testing with ML',
				url: 'https://example.com/podcast-ai-testing',
				type: 'podcast',
				source: 'DevOps Podcast',
				date: 'May 14, 2026'
			},
			{
				title: 'Using GPT for Test Case Generation',
				url: 'https://example.com/gpt-test-cases',
				type: 'article',
				source: 'Dev.to',
				date: 'May 10, 2026'
			},
			{
				title: 'Intelligent Test Execution with AI',
				url: 'https://www.youtube.com/watch?v=example4',
				type: 'youtube',
				source: 'YouTube',
				duration: '52 min',
				views: '9.1K'
			}
		]
	};

	return mockSources[topic.id] || [];
}

/**
 * Commit draft to content/drafts branch
 */
function commitDraft(filename, topicName) {
	try {
		// Check if we're on the drafts branch
		const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();

		if (currentBranch !== 'content/drafts') {
			console.log(`📌 Note: Currently on "${currentBranch}" branch. Use git checkout content/drafts to review drafts.`);
		}

		// Stage the file
		execSync(`git add src/posts/${filename}`, { cwd: projectRoot });

		// Commit
		const message = `draft: Auto-generated content for ${topicName} (${today})`;
		execSync(`git commit -m "${message}"`, { cwd: projectRoot });

		console.log(`✅ Committed: ${message}`);
	} catch (error) {
		console.warn(`⚠️  Could not auto-commit. Make sure you're on the content/drafts branch.`);
		console.warn(`   Run: git checkout -b content/drafts (first time) or git checkout content/drafts`);
	}
}

/**
 * Main function
 */
async function main() {
	console.log(`\n🚀 Content Draft Generator — ${today}\n`);

	const topicId = process.argv[2];
	const topics = topicId ? config.topics.filter((t) => t.id === topicId) : config.topics.filter((t) => t.enabled);

	if (topics.length === 0) {
		console.error('❌ No topics found. Check your config or topic ID.');
		process.exit(1);
	}

	const results = [];

	for (const topic of topics) {
		console.log(`📌 Processing: ${topic.name}`);

		// Search for content
		const sources = searchContent(topic);

		if (sources.length === 0) {
			console.warn(`   ⚠️  No sources found. Skipping.`);
			continue;
		}

		// Create blog post
		const result = createBlogPost(topic, sources);
		results.push(result);

		// Commit to git
		commitDraft(result.filename, topic.name);

		console.log(`   📚 ${result.sourceCount} sources included\n`);
	}

	if (results.length > 0) {
		console.log(`\n✅ Generated ${results.length} draft(s):`);
		results.forEach((r) => {
			console.log(`   • ${r.topic}: ${r.filename}`);
		});
		console.log(`\n📋 Next Steps:`);
		console.log(`   1. git checkout content/drafts`);
		console.log(`   2. Review the draft files in src/posts/`);
		console.log(`   3. Edit as needed`);
		console.log(`   4. npm run publish-drafts (to publish)\n`);
	} else {
		console.log('⚠️  No drafts generated.');
	}
}

main().catch((error) => {
	console.error('❌ Error:', error.message);
	process.exit(1);
});
