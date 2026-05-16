<script lang="ts">
	import BlogCard from '../../components/BlogCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | Ken Shinzato — QA Engineer</title>
	<meta
		name="description"
		content="Technical blog posts on QA engineering, test automation, AI, and software development. Insights from 15+ years of testing expertise."
	/>
	<meta property="og:title" content="Blog | Ken Shinzato" />
	<meta
		property="og:description"
		content="Technical articles on QA engineering, test automation, and development practices."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kenshinzato.dev/blog" />
	<meta property="og:image" content="/images/profile.jpg" />
	<meta name="twitter:title" content="Blog | Ken Shinzato" />
	<meta
		name="twitter:description"
		content="Technical articles on QA engineering, test automation, and development practices."
	/>
</svelte:head>

<main class="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200">
	<section class="py-20 sm:py-24 lg:py-32">
		<div class="max-w-5xl mx-auto px-6 lg:px-8">
			<!-- Page Header -->
			<div class="mb-16">
				<p class="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Writing</p>
				<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mt-4 mb-4">
					Blog
				</h1>
				<p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
					Thoughts on QA engineering, test automation, AI in testing, and building quality software at scale.
				</p>
			</div>

			<!-- Posts Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				{#each data.posts as post}
					<BlogCard {post} headingLevel="h2" />
				{/each}
			</div>

			{#if data.posts.length === 0}
				<div class="text-center py-12">
					<p class="text-slate-600 dark:text-slate-400">No posts yet. Check back soon!</p>
				</div>
			{/if}
		</div>
	</section>
</main>
