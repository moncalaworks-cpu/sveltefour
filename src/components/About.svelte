<script lang="ts">
	import ScrollReveal from './ScrollReveal.svelte';
	import { analytics } from '$lib/analytics';

	interface Highlight {
		label: string;
		value: string;
	}

	interface Props {
		name?: string;
		title?: string;
		bio?: string;
		highlights?: Highlight[];
		imageUrl?: string;
		imageAlt?: string;
	}

	let {
		name = 'Your Name',
		title = 'Full-stack Developer & Designer',
		bio = 'Passionate about building elegant, user-centric digital experiences. With expertise spanning frontend and backend, I create solutions that are both beautiful and functional.',
		highlights = [
			{ label: 'Years Experience', value: '5+' },
			{ label: 'Projects Shipped', value: '20+' },
			{ label: 'Languages', value: 'JavaScript, Python, SQL' }
		],
		imageUrl = undefined,
		imageAlt = `${name}'s professional photo`
	}: Props = $props();

	function handleResumeDownload() {
		analytics.fileDownload('resume.pdf', 'pdf');
	}
</script>

<section id="about" class="bg-white dark:bg-slate-900 py-20 sm:py-24 lg:py-32 transition-colors duration-200">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<!-- Section Label -->
		<ScrollReveal animation="fade">
			{#snippet children()}
				<div class="mb-12">
					<p class="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">About Me</p>
				</div>
			{/snippet}
		</ScrollReveal>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<!-- Left: Professional Photo (with premium frame effect) -->
			{#if imageUrl}
				<ScrollReveal animation="slide-left" class="flex justify-center lg:justify-start w-full">
					{#snippet children()}
						<div class="flex justify-center lg:justify-start">
							<div class="relative w-full max-w-md">
								<!-- Subtle accent background -->
								<div class="absolute -inset-4 bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 rounded-lg transition-colors duration-200"></div>

								<!-- Photo container -->
								<div class="relative overflow-hidden rounded-lg shadow-lg dark:shadow-2xl">
									<picture>
										<source
											srcSet={(() => {
												const basePath = imageUrl.replace('.jpg', '');
												return `${basePath}-sm.webp 400w, ${basePath}-md.webp 600w, ${basePath}-lg.webp 870w`;
											})()}
											type="image/webp"
											sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 870px"
										/>
										<source
											srcSet={(() => {
												const basePath = imageUrl.replace('.jpg', '');
												return `${basePath}-sm.jpg 400w, ${basePath}-md.jpg 600w, ${basePath}-lg.jpg 870w`;
											})()}
											sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 870px"
										/>
										<img
											src={imageUrl}
											alt={imageAlt}
											class="w-full h-auto object-cover aspect-square"
											loading="lazy"
										/>
									</picture>
								</div>

								<!-- Decorative accent line -->
								<div class="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-200"></div>
							</div>
						</div>
					{/snippet}
				</ScrollReveal>
			{/if}

			<!-- Right: Bio & Highlights -->
			<ScrollReveal animation="slide-right" class={`${imageUrl ? '' : 'lg:col-span-2'} w-full`}>
				{#snippet children()}
					<!-- Bio Section with Accent Bar -->
					<div class="relative pl-6 sm:pl-8 border-l-4 border-slate-900 dark:border-slate-50">
						<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
							{name}
						</h2>
						<p class="text-lg text-slate-600 dark:text-slate-400 font-medium mb-6">{title}</p>

						<div class="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none">
							{#each bio.split('\n\n') as paragraph}
								<p>{paragraph}</p>
							{/each}
						</div>
					</div>

					<!-- Highlights Grid -->
					<div class="mt-12 pt-12 border-t border-slate-200 dark:border-slate-700">
						<div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
							{#each highlights as highlight (highlight.label)}
								<div
									class="group cursor-default transition-transform duration-300 hover:translate-y-[-4px]"
								>
									<p
										class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors"
									>
										{highlight.value}
									</p>
									<p class="text-sm text-slate-500 dark:text-slate-500 font-medium uppercase tracking-widest">
										{highlight.label}
									</p>
								</div>
							{/each}
						</div>

						<!-- Resume Download CTA -->
						<div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
							<a
								href="/documents/resume.pdf"
								download="Ken-Shinzato-Resume.pdf"
								onclick={handleResumeDownload}
								class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-200 hover:scale-105 active:scale-95"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4" />
								</svg>
								Download Resume
							</a>
						</div>
					</div>
				{/snippet}
			</ScrollReveal>
		</div>
	</div>
</section>

<style>
	:global(.prose) {
		--tw-prose-body: rgb(55 65 81);
		--tw-prose-headings: rgb(15 23 42);
		--tw-prose-links: rgb(15 23 42);
		--tw-prose-code: rgb(55 65 81);
		--tw-prose-pre-bg: rgb(248 250 252);
		--tw-prose-hr: rgb(226 232 240);
	}

	:global(.dark .prose) {
		--tw-prose-body: rgb(226 232 240);
		--tw-prose-headings: rgb(248 250 252);
		--tw-prose-links: rgb(226 232 240);
		--tw-prose-code: rgb(226 232 240);
		--tw-prose-pre-bg: rgb(15 23 42);
		--tw-prose-hr: rgb(51 65 85);
	}

	/* Hover effect for highlights */
	@media (prefers-reduced-motion: no-preference) {
		:global(.group) {
			transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}
	}
</style>
