<script lang="ts">
	import ScrollReveal from './ScrollReveal.svelte';

	interface Achievement {
		text: string;
	}

	interface ExperienceEntry {
		company: string;
		title: string;
		startDate: string;
		endDate: string | 'present';
		description?: string;
		achievements?: Achievement[];
	}

	interface Props {
		experiences?: ExperienceEntry[];
	}

	const defaultExperiences: ExperienceEntry[] = [
		{
			company: 'Tech Company',
			title: 'Senior Developer',
			startDate: 'Jan 2022',
			endDate: 'present',
			description: 'Led frontend architecture and mentored junior developers',
			achievements: [
				{ text: 'Improved app performance by 40% through code optimization' },
				{ text: 'Architected design system used across 5+ products' },
				{ text: 'Mentored 3 junior developers to senior roles' }
			]
		},
		{
			company: 'Digital Agency',
			title: 'Full-stack Developer',
			startDate: 'Jun 2020',
			endDate: 'Dec 2021',
			description: 'Developed and deployed client projects from concept to production',
			achievements: [
				{ text: 'Delivered 12+ projects for enterprise clients' },
				{ text: 'Reduced deployment time from 2 hours to 15 minutes' },
				{ text: 'Established code review standards improving quality metrics' }
			]
		},
		{
			company: 'Startup',
			title: 'Frontend Developer',
			startDate: 'Mar 2019',
			endDate: 'May 2020',
			description: 'Built responsive web applications and led UI/UX initiatives',
			achievements: [
				{ text: 'Built responsive web app used by 50k+ monthly active users' },
				{ text: 'Designed and implemented component library' },
				{ text: 'Collaborated with designers to improve user experience' }
			]
		}
	];

	let { experiences = defaultExperiences }: Props = $props();

	function formatDateRange(startDate: string, endDate: string | 'present'): string {
		const end = endDate === 'present' ? 'Present' : endDate;
		return `${startDate} — ${end}`;
	}
</script>

<section id="experience" class="bg-white dark:bg-slate-950 py-20 sm:py-24 lg:py-32 transition-colors duration-200">
	<div class="max-w-5xl mx-auto px-6 lg:px-8">
		<!-- Section Label -->
		<div class="mb-12">
			<p class="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Experience</p>
		</div>

		<!-- Timeline Container -->
		<div class="space-y-8 sm:space-y-12">
			{#each experiences as entry, index (index)}
				<ScrollReveal animation="slide-left" delay={index * 150} class="w-full">
					{#snippet children()}
						<article
							class="relative pl-0 sm:pl-12 border-l-0 sm:border-l-2 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors duration-300"
						>
					<!-- Timeline Dot (visible on desktop) -->
					<div
						class="absolute left-0 top-2 sm:top-1 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-950 ring-2 ring-slate-200 dark:ring-slate-700 -translate-x-2 sm:-translate-x-3 hidden sm:block hover:bg-slate-400 dark:hover:bg-slate-600 hover:ring-slate-400 dark:hover:ring-slate-600 transition-colors duration-300"
					></div>

					<!-- Desktop Layout: Date Range on Left -->
					<div class="hidden sm:block absolute -left-28 top-0 w-24 text-right pr-4">
						<time
							class="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap"
						>
							{formatDateRange(entry.startDate, entry.endDate)}
						</time>
					</div>

					<!-- Mobile: Date Range at Top -->
					<div class="block sm:hidden mb-3">
						<time
							class="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest"
						>
							{formatDateRange(entry.startDate, entry.endDate)}
						</time>
					</div>

					<!-- Card Container -->
					<div class="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 sm:p-7 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm dark:hover:shadow-lg transition-all duration-300">
						<!-- Company & Title -->
						<div class="mb-4">
							<h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 mb-1">
								{entry.title}
							</h3>
							<p class="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400">
								{entry.company}
							</p>
						</div>

						<!-- Description -->
						{#if entry.description}
							<p class="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
								{entry.description}
							</p>
						{/if}

						<!-- Achievements List -->
						{#if entry.achievements && entry.achievements.length > 0}
							<ul class="space-y-3">
								{#each entry.achievements as achievement (achievement.text)}
									<li class="flex items-start gap-3">
										<span
											class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-2"
										></span>
										<span class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
											{achievement.text}
										</span>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</article>
					{/snippet}
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Ensure smooth transitions for timeline interactions */
	:global(article) {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
