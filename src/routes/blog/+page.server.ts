import { getAllPosts } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const posts = await getAllPosts();

	return {
		posts
	};
};
