import { error } from '@sveltejs/kit';
import { getPostBySlug, getAllPosts } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		post
	};
};

export async function entries() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		slug: post.slug
	}));
}
