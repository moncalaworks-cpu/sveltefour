import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Post, PostMetadata } from './blog';

/**
 * Dynamically load all blog posts from markdown files
 * This allows generated drafts to appear automatically
 * Uses server-side file system access for prerendering
 */

interface RawPost {
	title: string;
	date: string;
	description: string;
	tags: string[];
	slug: string;
	author: string;
	[key: string]: any;
}

/**
 * Get the posts directory (works in both dev and build)
 */
function getPostsDir(): string {
	// In development and build, use relative path from project root
	return path.join(process.cwd(), 'src', 'posts');
}

/**
 * Load all posts from markdown files in src/posts/
 */
export async function loadPostsFromMarkdown(): Promise<Post[]> {
	const postsDir = getPostsDir();

	if (!fs.existsSync(postsDir)) {
		console.warn(`Posts directory not found: ${postsDir}`);
		return [];
	}

	const files = fs
		.readdirSync(postsDir)
		.filter((file) => file.endsWith('.md'))
		.sort()
		.reverse();

	const posts: Post[] = [];

	for (const file of files) {
		const filePath = path.join(postsDir, file);

		try {
			const content = fs.readFileSync(filePath, 'utf-8');

			// Parse frontmatter
			const { data, content: markdown } = matter(content);

			// Ensure required fields
			const postData = data as RawPost;
			if (!postData.slug || !postData.title || !postData.date) {
				console.warn(`Skipping post ${file}: missing required fields`);
				continue;
			}

			// Convert markdown to HTML
			const html = await marked(markdown);

			posts.push({
				title: postData.title,
				date: postData.date,
				description: postData.description || '',
				tags: postData.tags || [],
				slug: postData.slug,
				author: postData.author || 'Ken Shinzato',
				html: html as string
			});
		} catch (error) {
			console.error(`Error loading post ${file}:`, error);
		}
	}

	// Sort by date (newest first)
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Cache posts in memory for performance
 */
let postsCache: Post[] | null = null;

export async function getPosts(): Promise<Post[]> {
	if (!postsCache) {
		postsCache = await loadPostsFromMarkdown();
	}
	return postsCache;
}

/**
 * Get all posts (metadata only)
 */
export async function getAllPostsMetadata(): Promise<PostMetadata[]> {
	const posts = await getPosts();
	return posts.map(({ html, ...meta }) => meta);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlugDynamic(slug: string): Promise<Post | null> {
	const posts = await getPosts();
	return posts.find((post) => post.slug === slug) || null;
}

/**
 * Clear cache (useful for development with HMR)
 */
export function clearPostsCache(): void {
	postsCache = null;
}
