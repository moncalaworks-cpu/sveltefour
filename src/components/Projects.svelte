<script lang="ts">
	import ScrollReveal from './ScrollReveal.svelte';
	import { analytics } from '$lib/analytics';

	interface ProjectLink {
		label: string;
		url: string;
		icon?: 'github' | 'link';
	}

	interface Project {
		id: string;
		title: string;
		description: string;
		technologies: string[];
		links?: ProjectLink[];
		thumbnail?: string;
		thumbnailAlt?: string;
	}

	interface Props {
		projects?: Project[];
		title?: string;
		subtitle?: string;
	}

	let {
		projects = [
			{
				id: '1',
				title: 'E-Commerce Platform',
				description:
					'Full-stack e-commerce solution with real-time inventory management, secure payment processing, and admin dashboard. Improved conversion rates by 35% through UX optimization.',
				technologies: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
				links: [
					{ label: 'GitHub', url: '#', icon: 'github' },
					{ label: 'Live Demo', url: '#', icon: 'link' }
				]
			},
			{
				id: '2',
				title: 'Analytics Dashboard',
				description:
					'Real-time analytics visualization platform with interactive charts and data exploration tools. Handles 10M+ data points with sub-second query performance.',
				technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Redis'],
				links: [
					{ label: 'GitHub', url: '#', icon: 'github' },
					{ label: 'Live Demo', url: '#', icon: 'link' }
				]
			},
			{
				id: '3',
				title: 'Design System Library',
				description:
					'Comprehensive component library with 50+ reusable UI components, thorough documentation, and accessibility compliance. Used across 3 enterprise applications.',
				technologies: ['Svelte', 'Storybook', 'TypeScript', 'SCSS', 'Figma'],
				links: [
					{ label: 'GitHub', url: '#', icon: 'github' },
					{ label: 'Storybook', url: '#', icon: 'link' }
				]
			},
			{
				id: '4',
				title: 'Social Collaboration App',
				description:
					'Real-time collaborative workspace with live editing, commenting, and team notifications. Achieved 4.8/5 user satisfaction rating with 50K+ active users.',
				technologies: ['Next.js', 'WebSockets', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
				links: [
					{ label: 'GitHub', url: '#', icon: 'github' },
					{ label: 'Live Demo', url: '#', icon: 'link' }
				]
			}
		],
		title = 'Featured Work',
		subtitle = 'A selection of projects showcasing my expertise across different technologies and domains'
	}: Props = $props();

	function getIcon(icon?: string) {
		switch (icon) {
			case 'github':
				return 'github';
			case 'link':
				return 'link';
			default:
				return undefined;
		}
	}

	function handleProjectLinkClick(projectName: string, linkLabel: string) {
		analytics.projectInterest(projectName, `click-${linkLabel.toLowerCase()}`);
	}
</script>

<section id="projects" class="bg-white dark:bg-slate-950 py-20 sm:py-24 lg:py-32 transition-colors duration-200">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<!-- Section Header -->
		<ScrollReveal animation="slide-up" class="mb-16">
			{#snippet children()}
				<p class="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">{title}</p>
				<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mt-2 mb-4 max-w-2xl">
					{title}
				</h2>
				<p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
					{subtitle}
				</p>
			{/snippet}
		</ScrollReveal>

		<!-- Projects Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
			{#each projects as project, index (project.id)}
				<ScrollReveal animation="slide-up" delay={index * 100} class="h-full">
					{#snippet children()}
						<div
					class="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700"
				>
					<!-- Thumbnail (if available) -->
					{#if project.thumbnail}
						<div class="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
							<img
								src={project.thumbnail}
								alt={project.thumbnailAlt || project.title}
								class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							<!-- Gradient overlay on hover -->
							<div
								class="absolute inset-0 bg-gradient-to-t from-slate-900/20 dark:from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							></div>
						</div>
					{/if}

					<!-- Content -->
					<div class="p-6 sm:p-8">
						<!-- Title -->
						<h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3 line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
							{project.title}
						</h3>

						<!-- Description -->
						<p class="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6 line-clamp-3">
							{project.description}
						</p>

						<!-- Technologies -->
						<div class="mb-6">
							<div class="flex flex-wrap gap-2">
								{#each project.technologies as tech (tech)}
									<span
										class="inline-block px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
									>
										{tech}
									</span>
								{/each}
							</div>
						</div>

						<!-- Links -->
						{#if project.links && project.links.length > 0}
							<div class="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
								{#each project.links as link (link.label)}
									<a
										href={link.url || '#'}
										onclick={() => handleProjectLinkClick(project.title, link.label)}
										rel="noopener noreferrer"
										target={link.url?.startsWith('http') ? '_blank' : undefined}
										class="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors group/link"
									>
										{#if link.icon === 'github'}
											<span class="inline-flex w-4 h-4">
												<svg fill="currentColor" viewBox="0 0 20 20">
													<path
														fill-rule="evenodd"
														d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.195 20 14.44 20 10.017 20 4.484 15.522 0 10 0z"
														clip-rule="evenodd"
													/>
												</svg>
											</span>
										{:else if link.icon === 'link'}
											<span class="inline-flex w-4 h-4">
												<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-6l6-6m0 0L21 3m0 0v6m0 0H15"
													/>
												</svg>
											</span>
										{/if}
										<span class="border-b border-transparent group-hover/link:border-slate-900 dark:group-hover/link:border-slate-50 transition-colors">
											{link.label}
										</span>
									</a>
								{/each}
							</div>
						{/if}
					</div>

							<!-- Subtle accent on top (visible on hover) -->
							<div
								class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-200 dark:from-slate-600 dark:via-slate-500 dark:to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							></div>
						</div>
					{/snippet}
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<style>
	:global(.line-clamp-2) {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		overflow: hidden;
	}

	:global(.line-clamp-3) {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		line-clamp: 3;
		overflow: hidden;
	}

	@media (prefers-reduced-motion: no-preference) {
		:global(.group) {
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}
	}
</style>
