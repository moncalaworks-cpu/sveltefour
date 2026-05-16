<script lang="ts">
	import { analytics } from '$lib/analytics';

	interface Props {
		heading?: string;
		tagline?: string;
		primaryCta?: string;
		primaryCtaHref?: string;
		secondaryCta?: string;
		secondaryCtaHref?: string;
	}

	let {
		heading = 'Your Name',
		tagline = 'Full-stack developer & designer',
		primaryCta = 'View Projects',
		primaryCtaHref = '#projects',
		secondaryCta = 'Get in Touch',
		secondaryCtaHref = '#contact'
	}: Props = $props();

	// Track if component has mounted to trigger animations
	let mounted = $state(false);

	$effect(() => {
		// Trigger animations on mount
		mounted = true;
	});

	function handleCtaClick(ctaText: string) {
		analytics.ctaClick(ctaText);
	}

	function handleResumeDownload() {
		analytics.fileDownload('resume.pdf', 'pdf');
	}
</script>

<section class="min-h-[600px] w-full bg-white dark:bg-slate-950 flex items-center justify-center transition-colors duration-200">
	<div class="max-w-3xl mx-auto px-6 py-20 sm:py-32 text-center">
		<!-- Heading -->
		<h1
			class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 {mounted
				? 'animate-slide-up'
				: 'opacity-0'}"
			style={mounted ? 'animation-duration: 600ms;' : ''}
		>
			{heading}
		</h1>

		<!-- Tagline -->
		<p
			class="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto {mounted
				? 'animate-slide-up'
				: 'opacity-0'}"
			style={mounted ? 'animation-duration: 600ms; animation-delay: 100ms;' : ''}
		>
			{tagline}
		</p>

		<!-- CTA Buttons -->
		<div
			class="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-start flex-wrap {mounted
				? 'animate-slide-up'
				: 'opacity-0'}"
			style={mounted ? 'animation-duration: 600ms; animation-delay: 200ms;' : ''}
		>
			<!-- Primary CTA -->
			<a
				href={primaryCtaHref}
				onclick={() => handleCtaClick(primaryCta)}
				class="inline-flex px-8 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
			>
				{primaryCta}
			</a>

			<!-- Secondary CTA -->
			<a
				href={secondaryCtaHref}
				onclick={() => handleCtaClick(secondaryCta)}
				class="inline-flex px-8 py-3 border-2 border-slate-900 dark:border-slate-50 text-slate-900 dark:text-slate-50 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200 hover:scale-105 active:scale-95"
			>
				{secondaryCta}
			</a>

			<!-- Resume Download Button -->
			<a
				href="/documents/resume.pdf"
				download="Ken-Shinzato-Resume.pdf"
				onclick={handleResumeDownload}
				class="inline-flex px-8 py-3 border-2 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-50 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105 active:scale-95"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4" />
				</svg>
				Download Resume
			</a>
		</div>

		<!-- Scroll Indicator (Optional) -->
		<div
			class="{mounted ? 'animate-fade-in' : 'opacity-0'}"
			style={mounted ? 'animation-duration: 800ms; animation-delay: 300ms;' : ''}
		>
			<div class="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
				<p class="text-sm text-slate-500 dark:text-slate-500">Scroll to explore</p>
				<div class="mt-4 flex justify-center">
					<svg
						class="w-6 h-6 text-slate-400 dark:text-slate-600 animate-bounce"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-0.5rem);
		}
	}

	:global(.animate-bounce) {
		animation: bounce 1s infinite;
	}
</style>
