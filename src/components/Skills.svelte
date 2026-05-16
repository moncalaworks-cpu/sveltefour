<script lang="ts">
	import ScrollReveal from './ScrollReveal.svelte';

	interface Skill {
		name: string;
		proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
	}

	interface SkillCategory {
		name: string;
		icon?: string;
		skills: Skill[];
	}

	interface Props {
		categories?: SkillCategory[];
		layout?: 'grid' | 'categories';
		showProficiency?: boolean;
	}

	const defaultCategories: SkillCategory[] = [
		{
			name: 'Frontend',
			icon: '⚡',
			skills: [
				{ name: 'JavaScript', proficiency: 'expert' },
				{ name: 'React', proficiency: 'advanced' },
				{ name: 'Svelte', proficiency: 'expert' },
				{ name: 'TypeScript', proficiency: 'advanced' },
				{ name: 'CSS/Tailwind', proficiency: 'expert' },
				{ name: 'HTML5', proficiency: 'expert' }
			]
		},
		{
			name: 'Backend',
			icon: '🔧',
			skills: [
				{ name: 'Node.js', proficiency: 'advanced' },
				{ name: 'Python', proficiency: 'advanced' },
				{ name: 'SQL', proficiency: 'intermediate' },
				{ name: 'REST APIs', proficiency: 'advanced' },
				{ name: 'PostgreSQL', proficiency: 'intermediate' },
				{ name: 'MongoDB', proficiency: 'intermediate' }
			]
		},
		{
			name: 'Tools & Platforms',
			icon: '🛠️',
			skills: [
				{ name: 'Git', proficiency: 'expert' },
				{ name: 'Docker', proficiency: 'intermediate' },
				{ name: 'AWS', proficiency: 'intermediate' },
				{ name: 'Vercel', proficiency: 'expert' },
				{ name: 'CI/CD', proficiency: 'intermediate' },
				{ name: 'Figma', proficiency: 'intermediate' }
			]
		},
		{
			name: 'Soft Skills',
			icon: '💡',
			skills: [
				{ name: 'Communication', proficiency: 'expert' },
				{ name: 'Problem-solving', proficiency: 'expert' },
				{ name: 'Leadership', proficiency: 'advanced' },
				{ name: 'Project Management', proficiency: 'advanced' },
				{ name: 'Mentoring', proficiency: 'advanced' },
				{ name: 'Collaboration', proficiency: 'expert' }
			]
		}
	];

	let {
		categories = defaultCategories,
		layout = 'categories',
		showProficiency = true
	}: Props = $props();

	const proficiencyColors = {
		beginner: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
		intermediate: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
		advanced: 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-slate-100',
		expert: 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900'
	};

	function getProficiencyColor(proficiency?: string): string {
		if (!proficiency) return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
		return proficiencyColors[proficiency as keyof typeof proficiencyColors] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
	}
</script>

<section id="skills" class="bg-white dark:bg-slate-950 py-20 sm:py-24 lg:py-32 transition-colors duration-200">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<!-- Section Label -->
		<div class="mb-16">
			<p class="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Skills & Expertise</p>
		</div>

		{#if layout === 'categories'}
			<!-- Categories Layout -->
			<div class="space-y-16">
				{#each categories as category, catIndex (category.name)}
					<ScrollReveal animation="fade" delay={catIndex * 150} class="w-full">
						{#snippet children()}
							<div class="group">
								<!-- Category Header -->
								<div class="flex items-center gap-3 mb-8">
									{#if category.icon}
										<span class="text-2xl">{category.icon}</span>
									{/if}
									<h3 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-200">
										{category.name}
									</h3>
									<div class="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent ml-4 transition-colors duration-200"></div>
								</div>

								<!-- Skills Grid for This Category -->
								<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
									{#each category.skills as skill, skillIndex (skill.name)}
										<ScrollReveal animation="scale" delay={skillIndex * 50} class="w-full">
											{#snippet children()}
												<div
													class="inline-flex items-center gap-2 px-4 py-2.5 {getProficiencyColor(skill.proficiency)} rounded-lg transition-all duration-200 hover:shadow-md dark:hover:shadow-xl hover:scale-105"
												>
													<span class="font-medium text-sm sm:text-base">{skill.name}</span>
													{#if showProficiency && skill.proficiency}
														<span class="ml-auto text-xs font-semibold opacity-75">
															{skill.proficiency}
														</span>
													{/if}
												</div>
											{/snippet}
										</ScrollReveal>
									{/each}
								</div>
							</div>
						{/snippet}
					</ScrollReveal>
				{/each}
			</div>
		{:else if layout === 'grid'}
			<!-- Unified Grid Layout -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each categories as category, catIndex (category.name)}
					<ScrollReveal animation="slide-up" delay={catIndex * 100} class="h-full">
						{#snippet children()}
							<div
								class="p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm dark:hover:shadow-lg transition-all duration-200 group bg-white dark:bg-slate-900"
							>
								<!-- Category Title -->
								<div class="flex items-center gap-2 mb-6">
									{#if category.icon}
										<span class="text-2xl">{category.icon}</span>
									{/if}
									<h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
										{category.name}
									</h3>
								</div>

								<!-- Skills List -->
								<div class="space-y-2">
									{#each category.skills as skill (skill.name)}
										<div class="flex items-center justify-between py-2 px-3 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
											<span class="text-sm text-slate-700 dark:text-slate-300 font-medium">{skill.name}</span>
											{#if showProficiency && skill.proficiency}
												<span class="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">
													{skill.proficiency}
												</span>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/snippet}
					</ScrollReveal>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	/* Smooth transitions for interactive elements */
	@media (prefers-reduced-motion: no-preference) {
		:global(div) {
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}
	}
</style>
