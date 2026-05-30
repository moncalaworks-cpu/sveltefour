<script lang="ts">
	import ScrollReveal from './ScrollReveal.svelte';
	import { analytics } from '$lib/analytics';

	interface ContactLink {
		label: string;
		url: string;
		icon?: string;
	}

	interface Props {
		email?: string;
		phone?: string;
		links?: ContactLink[];
		interests?: string[];
	}

	let {
		email = 'kshinz01@gmail.com',
		phone = undefined,
		links = [
			{ label: 'LinkedIn', url: 'https://linkedin.com/in/kenshinzato', icon: 'linkedin' },
			{ label: 'GitHub', url: 'https://github.com/kenshinzato', icon: 'github' }
		],
		interests = ['Web Development', 'Testing & QA', 'Open Source']
	}: Props = $props();

	function handleExternalLinkClick(url: string, label: string) {
		analytics.externalLinkClick(url, label);
	}

	function handleEmailClick() {
		analytics.navigationClick('contact-email');
	}
</script>

<section id="contact" class="bg-white dark:bg-slate-900 py-20 sm:py-24 lg:py-32 transition-colors duration-200">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<!-- Section Label -->
		<ScrollReveal animation="fade">
			{#snippet children()}
				<div class="mb-12">
					<p class="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Get in Touch</p>
					<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mt-4">Let's Connect</h2>
				</div>
			{/snippet}
		</ScrollReveal>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
			<!-- Contact Methods -->
			<ScrollReveal animation="slide-left" class="w-full">
				{#snippet children()}
					<div>
						<h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">Contact Information</h3>

						<div class="space-y-4">
							<!-- Email -->
							<div>
								<p class="text-sm text-slate-500 dark:text-slate-500 font-medium uppercase tracking-widest mb-2">Email</p>
								<a
									href="mailto:{email}"
									onclick={handleEmailClick}
									class="text-lg font-medium text-slate-900 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200 transition-colors inline-flex items-center gap-2"
								>
									{email}
								</a>
							</div>

							<!-- Phone (if provided) -->
							{#if phone}
								<div>
									<p class="text-sm text-slate-500 dark:text-slate-500 font-medium uppercase tracking-widest mb-2">Phone</p>
									<a
										href="tel:{phone}"
										class="text-lg font-medium text-slate-900 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
									>
										{phone}
									</a>
								</div>
							{/if}

							<!-- Social Links -->
							<div class="pt-4 border-t border-slate-200 dark:border-slate-800">
								<p class="text-sm text-slate-500 dark:text-slate-500 font-medium uppercase tracking-widest mb-4">Social</p>
								<div class="flex gap-4">
									{#each links as link (link.label)}
										<a
											href={link.url}
											onclick={() => handleExternalLinkClick(link.url, link.label)}
											rel="noopener noreferrer"
											target="_blank"
											class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
											aria-label={link.label}
										>
											{#if link.icon === 'linkedin'}
												LinkedIn
											{:else if link.icon === 'github'}
												GitHub
											{:else}
												{link.label}
											{/if}
										</a>
									{/each}
								</div>
							</div>

						</div>
					</div>
				{/snippet}
			</ScrollReveal>

			<!-- Interests -->
			<ScrollReveal animation="slide-right" class="w-full">
				{#snippet children()}
					<div>
						<h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">Interests & Hobbies</h3>

						<div class="space-y-3">
							{#each interests as interest}
								<div class="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
									<span class="text-2xl flex-shrink-0">🎯</span>
									<span class="text-slate-700 dark:text-slate-300 font-medium">{interest}</span>
								</div>
							{/each}
						</div>

						<div class="mt-8 p-6 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-lg transition-colors duration-200">
							<p class="mb-4">Always open to discussing web development, QA automation, and collaboration opportunities.</p>
							<p class="text-sm text-slate-300 dark:text-slate-700">Response time: typically within 24 hours</p>
						</div>
					</div>
				{/snippet}
			</ScrollReveal>
		</div>
	</div>
</section>

<style>
	a {
		text-decoration: none;
	}
</style>
