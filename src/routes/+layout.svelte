<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { page } from '$app/stores';
	import Navbar from '../components/Navbar.svelte';
	import { theme } from '$lib/themeStore';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	let { children } = $props();

	// Initialize Vercel Analytics and Speed Insights
	$effect(() => {
		if (typeof window !== 'undefined') {
			injectAnalytics();
			injectSpeedInsights();
		}
	});
</script>

<svelte:head>
	<script>
		{
			// Prevent flash of wrong theme on page load
			const stored = localStorage.getItem('theme-preference');
			const theme = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
			if (theme === 'dark') {
				document.documentElement.classList.add('dark');
			}
		}
	</script>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Ken Shinzato — QA Engineer & Manager</title>
	<meta
		name="description"
		content="QA Engineer & Manager with 15+ years of experience in test automation, mobile testing, and building high-performing QA teams. Specializing in Selenium, Playwright, and Appium."
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://kenshinzato.dev{$page.url.pathname}" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Ken Shinzato — QA Engineer" />
	<meta property="og:url" content="https://kenshinzato.dev{$page.url.pathname}" />
	<meta
		property="og:title"
		content="Ken Shinzato — QA Engineer & Manager | 15+ Years of Testing Excellence"
	/>
	<meta
		property="og:description"
		content="QA Engineer & Manager specializing in test automation, mobile testing, and QA leadership."
	/>
	<meta property="og:image" content="https://kenshinzato.dev/images/profile.jpg" />
	<meta property="og:image:alt" content="Ken Shinzato" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="Ken Shinzato — QA Engineer & Manager | 15+ Years of Testing Excellence"
	/>
	<meta
		name="twitter:description"
		content="QA Engineer & Manager specializing in test automation, mobile testing, and QA leadership."
	/>
	<meta name="twitter:image" content="https://kenshinzato.dev/images/profile.jpg" />
	<meta name="twitter:site" content="@kenshinz" />
</svelte:head>

<Navbar />
{@render children()}
