<script lang="ts">
	import type { PageData } from './$types';
	import { analytics } from '$lib/analytics';

	let { data }: { data: PageData } = $props();

	// Track blog post view on mount
	$effect(() => {
		if (data.post.slug) {
			analytics.blogPostView(data.post.slug, data.post.title);
		}
	});

	function getJsonLd() {
		return {
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: data.post.title,
			description: data.post.description,
			datePublished: data.post.date,
			author: {
				'@type': 'Person',
				name: data.post.author,
				url: 'https://kenshinzato.dev'
			},
			publisher: {
				'@type': 'Person',
				name: 'Ken Shinzato'
			},
			url: `https://kenshinzato.dev/blog/${data.post.slug}`,
			image: 'https://kenshinzato.dev/images/profile.jpg'
		};
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}
</script>

<svelte:head>
	<title>{data.post.title} | Ken Shinzato</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://kenshinzato.dev/blog/{data.post.slug}" />
	<meta property="og:image" content="/images/profile.jpg" />
	<meta property="article:published_time" content={data.post.date} />
	<meta property="article:author" content={data.post.author} />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="/images/profile.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(getJsonLd())}<\/script>`}
</svelte:head>

<main class="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200">
	<article class="py-20 sm:py-24 lg:py-32">
		<div class="max-w-3xl mx-auto px-6 lg:px-8">
			<!-- Post Header -->
			<header class="mb-12">
				<p class="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">Article</p>
				<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 leading-tight">
					{data.post.title}
				</h1>

				<!-- Meta -->
				<div class="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
					<time>{formatDate(data.post.date)}</time>
					<span>•</span>
					<span>{data.post.author}</span>
					<span>•</span>
					<span>{Math.ceil(data.post.html.split(' ').length / 200)} min read</span>
				</div>

				<!-- Tags -->
				{#if data.post.tags && data.post.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each data.post.tags as tag}
							<span class="inline-block px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</header>

			<!-- Post Content (Prose) -->
			<div class="prose dark:prose-invert prose-slate max-w-none">
				{@html data.post.html}
			</div>

			<!-- Post Footer -->
			<footer class="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
				<div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
					<h3 class="font-semibold text-slate-900 dark:text-slate-50 mb-2">About the author</h3>
					<p class="text-sm text-slate-700 dark:text-slate-300">
						<strong>Ken Shinzato</strong> is a QA Engineer & Manager with 15+ years of experience in software testing and quality assurance. He specializes in test automation, mobile testing, and building high-performing QA teams.
					</p>
				</div>
			</footer>

			<!-- Back to Blog -->
			<div class="mt-12">
				<a
					href="/blog"
					class="inline-flex items-center gap-2 text-slate-900 dark:text-slate-50 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
				>
					<span>←</span>
					<span>Back to Blog</span>
				</a>
			</div>
		</div>
	</article>
</main>

<style>
	:global(.prose) {
		--tw-prose-body: rgb(55 65 81);
		--tw-prose-headings: rgb(15 23 42);
		--tw-prose-links: rgb(15 23 42);
		--tw-prose-code: rgb(55 65 81);
		--tw-prose-pre-bg: rgb(248 250 252);
		--tw-prose-hr: rgb(226 232 240);
		--tw-prose-th-borders: rgb(203 213 225);
		--tw-prose-td-borders: rgb(226 232 240);
	}

	:global(.dark .prose) {
		--tw-prose-body: rgb(226 232 240);
		--tw-prose-headings: rgb(248 250 252);
		--tw-prose-links: rgb(191 219 254);
		--tw-prose-code: rgb(226 232 240);
		--tw-prose-pre-bg: rgb(15 23 42);
		--tw-prose-pre-code: rgb(226 232 240);
		--tw-prose-hr: rgb(71 85 99);
		--tw-prose-th-borders: rgb(71 85 99);
		--tw-prose-td-borders: rgb(71 85 99);
		--tw-prose-strong: rgb(248 250 252);
		--tw-prose-quotes: rgb(191 219 254);
	}
</style>
