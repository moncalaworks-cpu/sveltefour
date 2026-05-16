import { getAllPostsMetadata, getPostBySlugDynamic } from './posts-loader';

export interface PostMetadata {
	title: string;
	date: string;
	description: string;
	tags: string[];
	slug: string;
	author: string;
}

export interface Post extends PostMetadata {
	html: string;
}

/**
 * Get all blog posts (metadata only)
 * Dynamically loads from markdown files in src/posts/
 * Automatically includes generated drafts
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
	return getAllPostsMetadata();
}

/**
 * Get a single post by slug
 * Dynamically loads from markdown files
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
	return getPostBySlugDynamic(slug);
}
