<script lang="ts">
	import type { PostMetadata } from '$lib/blog';
	import BlogCard from './BlogCard.svelte';
	import ScrollReveal from './ScrollReveal.svelte';
	import { analytics } from '$lib/analytics';

	interface Props {
		posts: PostMetadata[];
	}

	let { posts }: Props = $props();

	function handleViewAllPostsClick() {
		analytics.ctaClick('View All Posts');
	}
</script>

<section id="blog" class="bg-slate-50 dark:bg-slate-900 py-20 sm:py-24 lg:py-32 transition-colors duration-200">
	<div class="max-w-5xl mx-auto px-6 lg:px-8">
		<!-- Section Label -->
		<ScrollReveal animation="fade">
			{#snippet children()}
				<div class="mb-12">
					<p class="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Writing</p>
					<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mt-4">From the Blog</h2>
				</div>
			{/snippet}
		</ScrollReveal>

		<!-- Blog Posts Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
			{#each posts as post, index}
				<ScrollReveal animation="slide-up" delay={index * 100} class="h-full">
					{#snippet children()}
						<BlogCard {post} headingLevel="h3" />
					{/snippet}
				</ScrollReveal>
			{/each}
		</div>

		<!-- CTA to View All Posts -->
		<ScrollReveal animation="fade" delay={posts.length * 100 + 100}>
			{#snippet children()}
				<div class="text-center">
					<a
						href="/blog"
						onclick={handleViewAllPostsClick}
						class="inline-flex px-8 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-200 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:scale-105 active:scale-95"
					>
						View All Posts
					</a>
				</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>

<style>
	a {
		text-decoration: none;
	}
</style>
