<script lang="ts">
	import Hero from '../components/Hero.svelte';
	import About from '../components/About.svelte';
	import Experience from '../components/Experience.svelte';
	import Projects from '../components/Projects.svelte';
	import Skills from '../components/Skills.svelte';
	import BlogPreview from '../components/BlogPreview.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main class="min-h-screen bg-white">
	<Hero
		heading="Ken Shinzato"
		tagline="QA Engineer & Manager"
		primaryCta="View Projects"
		primaryCtaHref="#projects"
		secondaryCta="Get in Touch"
		secondaryCtaHref="#contact"
	/>

	<About
		name="Ken Shinzato"
		title="QA Engineer & Manager"
		bio="Analytical and detail-oriented QA Engineer with 15+ years of experience in testing and automation. I specialize in designing comprehensive test strategies, building robust automation frameworks, and leading QA teams to deliver quality software.

With expertise in test automation tools (Selenium, Robot Framework, Appium) and cloud platforms (Azure, AWS), I've successfully managed complex projects including Oracle HR systems for 2000+ employees and large-scale data migrations. I'm passionate about code quality, continuous improvement, and mentoring junior testers to develop into automation engineers."
		highlights={[
			{ label: 'Years Experience', value: '15+' },
			{ label: 'Major Projects', value: '50+' },
			{ label: 'Top Tools', value: 'Selenium, Playwright, Appium' }
		]}
		imageUrl="/images/profile.jpg"
		imageAlt="Ken Shinzato - QA Engineer & Manager"
	/>

	<Experience
		experiences={[
			{
				company: 'Kinly',
				title: 'QA Engineer & Manager',
				startDate: 'Sep 2021',
				endDate: 'present',
				description: 'Plan, execute, and oversee inspection and testing of incoming and outgoing product to confirm quality conformance to specifications and quality deliverables.',
				achievements: [
					{ text: 'Built React Native + Detox automation framework with 85% test coverage' },
					{ text: 'Reduced manual testing time by 60% through CI/CD integration with CircleCI and AWS' },
					{ text: 'Managed Sprint Planning efforts establishing QA automation standards and best practices' },
					{ text: 'Automated 200+ test cases reducing regression testing cycles from 5 days to 1 day' }
				]
			},
			{
				company: 'PPL (Contractor)',
				title: 'QA Analyst & Engineer',
				startDate: 'Feb 2020',
				endDate: 'Sep 2021',
				description: 'Lead Analyst for Oracle cloud-based Human Resources system affecting over 2000 employees for a major utility company, conducting final user acceptance testing with field workers.',
				achievements: [
					{ text: 'Led UAT with 50+ field workers ensuring 2000+ employee system quality before go-live' },
					{ text: 'Performed comprehensive mobile testing on iOS devices ensuring responsive design compatibility' },
					{ text: 'Led defect triage sessions identifying and prioritizing 200+ bugs for timely resolution' },
					{ text: 'Created and maintained test suites in Azure DevOps tracking progress for cross-functional teams' }
				]
			},
			{
				company: 'Trend MLS / Bright MLS',
				title: 'QA Analyst',
				startDate: 'Jan 2013',
				endDate: 'Feb 2020',
				description: 'Conducted systems integration and parallel testing for major real estate MLS platform managing 1M+ listings.',
				achievements: [
					{ text: 'Executed successful migration of 1M+ listings from Trend Blue to Core Logic Matrix System with zero data loss' },
					{ text: 'Performed mobile app testing on TrendGo for Android and iOS across multiple device versions' },
					{ text: 'Managed data conversion of 2000+ members during Trend-Bright merger integration' },
					{ text: 'Created detailed test scenarios and requirements traceability matrices for complex system integrations' }
				]
			}
		]}
	/>

	<Projects
		projects={[
			{
				id: '1',
				title: 'React Native & Detox Test Automation',
				description: 'Built comprehensive mobile test automation framework for real-time communication platform using React Native and Detox. Integrated with CircleCI and AWS for continuous test execution across staging and production environments.',
				technologies: ['React Native', 'Detox', 'Python', 'CircleCI', 'AWS'],
				links: []
			},
			{
				id: '2',
				title: 'Oracle HR System UAT & Mobile Testing',
				description: 'Led user acceptance testing for enterprise Oracle cloud-based HR system serving 2000+ employees. Developed automated test suite using Python and Selenium validating system across iOS field devices and responsive design requirements.',
				technologies: ['Python', 'Selenium', 'Azure DevOps', 'Postman', 'Oracle'],
				links: []
			},
			{
				id: '3',
				title: 'MLS Data Migration & Integration Testing',
				description: 'Executed comprehensive testing for migration of 1M+ real estate listings from Trend Blue to Core Logic Matrix System. Validated system integration and parallel testing ensuring data integrity across merged MLS databases with 2000+ members.',
				technologies: ['Selenium', 'SQL Server', 'JIRA', 'Postman', 'Python'],
				links: []
			}
		]}
		title="Featured Testing Projects"
		subtitle="Key QA automation and testing initiatives showcasing expertise across mobile, web, and enterprise systems"
	/>

	<Skills
		categories={[
			{
				name: 'Test Automation Tools',
				icon: '🔬',
				skills: [
					{ name: 'Selenium WebDriver', proficiency: 'expert' },
					{ name: 'Playwright', proficiency: 'expert' },
					{ name: 'Appium', proficiency: 'advanced' },
					{ name: 'Robot Framework', proficiency: 'advanced' },
					{ name: 'Detox', proficiency: 'advanced' },
					{ name: 'Cucumber/BDD', proficiency: 'intermediate' }
				]
			},
			{
				name: 'Programming & Scripting',
				icon: '⚙️',
				skills: [
					{ name: 'Python', proficiency: 'expert' },
					{ name: 'JAVA', proficiency: 'advanced' },
					{ name: 'SQL', proficiency: 'advanced' },
					{ name: 'REST API Testing', proficiency: 'expert' },
					{ name: 'XML/JSON', proficiency: 'advanced' }
				]
			},
			{
				name: 'Platforms & Tools',
				icon: '☁️',
				skills: [
					{ name: 'Azure Cloud', proficiency: 'advanced' },
					{ name: 'AWS CI/CD', proficiency: 'advanced' },
					{ name: 'JIRA', proficiency: 'expert' },
					{ name: 'Zephyr Scale', proficiency: 'advanced' },
					{ name: 'Azure DevOps', proficiency: 'advanced' },
					{ name: 'Postman', proficiency: 'expert' }
				]
			},
			{
				name: 'Specializations',
				icon: '⭐',
				skills: [
					{ name: 'Mobile Testing (iOS/Android)', proficiency: 'expert' },
					{ name: 'Web Testing', proficiency: 'expert' },
					{ name: 'UAT Leadership', proficiency: 'expert' },
					{ name: 'Test Planning & Strategy', proficiency: 'expert' },
					{ name: 'Team Management', proficiency: 'advanced' },
					{ name: 'Requirements Analysis', proficiency: 'advanced' }
				]
			}
		]}
		layout="categories"
		showProficiency={true}
	/>

	<BlogPreview posts={data.latestPosts} />

	<!-- Contact Section -->
	<section id="contact" class="bg-white dark:bg-slate-900 py-20 sm:py-24 lg:py-32 transition-colors duration-200">
		<div class="max-w-5xl mx-auto px-6 lg:px-8">
			<div class="mb-12">
				<p class="text-sm font-semibold text-slate-500 uppercase tracking-widest">Contact</p>
				<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mt-4">Get in Touch</h2>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
				<!-- Contact Info -->
				<div class="space-y-8">
					<div>
						<h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Email</h3>
						<a
							href="mailto:kshinz01@gmail.com"
							class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
						>
							kshinz01@gmail.com
						</a>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-slate-900 mb-2">Phone</h3>
						<a href="tel:+12153474744" class="text-slate-600 hover:text-slate-900 transition-colors">
							(215) 347-4744
						</a>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-slate-900 mb-2">Location</h3>
						<p class="text-slate-600">Sparta, NJ</p>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-slate-900 mb-2">LinkedIn</h3>
						<a
							href="https://www.linkedin.com/in/ken-shinzato/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
						>
							Ken Shinzato
							<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M11 3a1 1 0 100 2h2.586L9.293 9.293a1 1 0 001.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
								></path>
								<path
									d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
								></path>
							</svg>
						</a>
					</div>
				</div>

				<!-- Experience & Impact Stats -->
				<div>
					<h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-10">Experience & Impact</h3>
					<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
							<!-- Years of Experience -->
							<div class="text-center p-4 sm:p-6 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
								<div class="flex justify-center items-end gap-1 mb-4 h-16">
									<div class="w-1 bg-slate-300 dark:bg-slate-600 rounded-sm" style="height: 20%;"></div>
									<div class="w-1 bg-slate-400 dark:bg-slate-500 rounded-sm" style="height: 40%;"></div>
									<div class="w-1 bg-slate-500 dark:bg-slate-400 rounded-sm" style="height: 60%;"></div>
									<div class="w-1 bg-slate-600 dark:bg-slate-300 rounded-sm" style="height: 80%;"></div>
									<div class="w-1 bg-slate-900 dark:bg-slate-50 rounded-sm" style="height: 100%;"></div>
								</div>
								<div class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">15+</div>
								<p class="text-sm text-slate-600 dark:text-slate-400 font-medium">Years Experience</p>
							</div>

							<!-- Projects Delivered -->
							<div class="text-center p-4 sm:p-6 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
								<div class="flex justify-center items-end gap-1 mb-4 h-16">
									<div class="w-1 bg-slate-300 dark:bg-slate-600 rounded-sm" style="height: 30%;"></div>
									<div class="w-1 bg-slate-400 dark:bg-slate-500 rounded-sm" style="height: 50%;"></div>
									<div class="w-1 bg-slate-500 dark:bg-slate-400 rounded-sm" style="height: 70%;"></div>
									<div class="w-1 bg-slate-600 dark:bg-slate-300 rounded-sm" style="height: 90%;"></div>
									<div class="w-1 bg-slate-900 dark:bg-slate-50 rounded-sm" style="height: 100%;"></div>
								</div>
								<div class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">50+</div>
								<p class="text-sm text-slate-600 dark:text-slate-400 font-medium">Projects</p>
							</div>

							<!-- Teams Led -->
							<div class="text-center p-4 sm:p-6 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
								<div class="flex justify-center items-end gap-1 mb-4 h-16">
									<div class="w-1 bg-slate-300 dark:bg-slate-600 rounded-sm" style="height: 25%;"></div>
									<div class="w-1 bg-slate-400 dark:bg-slate-500 rounded-sm" style="height: 45%;"></div>
									<div class="w-1 bg-slate-500 dark:bg-slate-400 rounded-sm" style="height: 65%;"></div>
									<div class="w-1 bg-slate-600 dark:bg-slate-300 rounded-sm" style="height: 85%;"></div>
									<div class="w-1 bg-slate-900 dark:bg-slate-50 rounded-sm" style="height: 100%;"></div>
								</div>
								<div class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">5+</div>
								<p class="text-sm text-slate-600 dark:text-slate-400 font-medium">Teams Led</p>
							</div>

							<!-- Automation Coverage -->
							<div class="text-center p-4 sm:p-6 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
								<div class="flex justify-center items-end gap-1 mb-4 h-16">
									<div class="w-1 bg-slate-300 dark:bg-slate-600 rounded-sm" style="height: 35%;"></div>
									<div class="w-1 bg-slate-400 dark:bg-slate-500 rounded-sm" style="height: 55%;"></div>
									<div class="w-1 bg-slate-500 dark:bg-slate-400 rounded-sm" style="height: 75%;"></div>
									<div class="w-1 bg-slate-600 dark:bg-slate-300 rounded-sm" style="height: 95%;"></div>
									<div class="w-1 bg-slate-900 dark:bg-slate-50 rounded-sm" style="height: 100%;"></div>
								</div>
								<div class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">85%+</div>
								<p class="text-sm text-slate-600 dark:text-slate-400 font-medium">Automation</p>
							</div>

							<!-- Rows Tested -->
							<div class="text-center p-4 sm:p-6 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
								<div class="flex justify-center items-end gap-1 mb-4 h-16">
									<div class="w-1 bg-slate-300 dark:bg-slate-600 rounded-sm" style="height: 32%;"></div>
									<div class="w-1 bg-slate-400 dark:bg-slate-500 rounded-sm" style="height: 52%;"></div>
									<div class="w-1 bg-slate-500 dark:bg-slate-400 rounded-sm" style="height: 72%;"></div>
									<div class="w-1 bg-slate-600 dark:bg-slate-300 rounded-sm" style="height: 92%;"></div>
									<div class="w-1 bg-slate-900 dark:bg-slate-50 rounded-sm" style="height: 100%;"></div>
								</div>
								<div class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">10M+</div>
								<p class="text-sm text-slate-600 dark:text-slate-400 font-medium">Rows Tested</p>
							</div>

							<!-- Test Pass Rate -->
							<div class="text-center p-4 sm:p-6 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
								<div class="flex justify-center items-end gap-1 mb-4 h-16">
									<div class="w-1 bg-slate-300 dark:bg-slate-600 rounded-sm" style="height: 40%;"></div>
									<div class="w-1 bg-slate-400 dark:bg-slate-500 rounded-sm" style="height: 60%;"></div>
									<div class="w-1 bg-slate-500 dark:bg-slate-400 rounded-sm" style="height: 80%;"></div>
									<div class="w-1 bg-slate-600 dark:bg-slate-300 rounded-sm" style="height: 98%;"></div>
									<div class="w-1 bg-slate-900 dark:bg-slate-50 rounded-sm" style="height: 100%;"></div>
								</div>
								<div class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">100%</div>
								<p class="text-sm text-slate-600 dark:text-slate-400 font-medium">Test Success</p>
							</div>
						</div>
					</div>
				</div>
			</div>
	</section>
</main>
