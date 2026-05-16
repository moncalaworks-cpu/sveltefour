import { getAllPosts } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getAllPosts();
	const latestPosts = posts.slice(0, 3);

	return {
		latestPosts
	};
};
