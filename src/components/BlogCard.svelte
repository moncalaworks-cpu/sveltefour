<script lang="ts">
	import type { PostMetadata } from '$lib/blog';

	interface Props {
		post: PostMetadata;
		headingLevel?: 'h2' | 'h3';
	}

	let { post, headingLevel = 'h2' }: Props = $props();

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}
</script>

<a href="/blog/{post.slug}" class="block h-full">
	<article
		class="h-full border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm dark:hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"
	>
		<div class="flex flex-col h-full">
			<!-- Heading -->
			{#if headingLevel === 'h2'}
				<h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3 leading-tight group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
					{post.title}
				</h2>
			{:else}
				<h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 mb-3 leading-tight group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
					{post.title}
				</h3>
			{/if}

			<!-- Meta: Date & Author -->
			<div class="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500 mb-3">
				<time>{formatDate(post.date)}</time>
				<span>•</span>
				<span>{post.author}</span>
			</div>

			<!-- Description -->
			<p class="text-slate-600 dark:text-slate-400 text-sm mb-5 leading-relaxed flex-grow">
				{post.description}
			</p>

			<!-- Tags -->
			{#if post.tags && post.tags.length > 0}
				<div class="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
					{#each post.tags.slice(0, 3) as tag}
						<span class="inline-block px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
							{tag}
						</span>
					{/each}
					{#if post.tags.length > 3}
						<span class="inline-block px-2 py-1 text-xs font-medium text-slate-500 dark:text-slate-500">
							+{post.tags.length - 3}
						</span>
					{/if}
				</div>
			{/if}
		</div>
	</article>
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}

	article {
		display: flex;
		flex-direction: column;
	}
</style>
