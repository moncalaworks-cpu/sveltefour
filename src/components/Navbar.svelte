<script lang="ts">
	import { page } from '$app/stores';
	import { theme } from '$lib/themeStore';
	import { analytics } from '$lib/analytics';

	let scrolled = $state(false);
	let menuOpen = $state(false);
	let currentTheme = $state<'light' | 'dark'>('light');

	$effect(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	$effect(() => {
		if (!menuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.closest('header') === null) {
				menuOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Subscribe to theme store
	$effect(() => {
		const unsubscribe = theme.subscribe((t) => {
			currentTheme = t;
		});
		return () => unsubscribe();
	});

	const links = [
		{ label: 'About', href: '/#about' },
		{ label: 'Experience', href: '/#experience' },
		{ label: 'Projects', href: '/#projects' },
		{ label: 'Skills', href: '/#skills' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '/#contact' }
	];

	function isActive(href: string): boolean {
		if (href.startsWith('/#')) {
			const hash = href.substring(1);
			return $page.url.hash === hash;
		}
		return $page.url.pathname === href;
	}

	function closeMobileMenu() {
		menuOpen = false;
	}

	function handleNavClick(href: string) {
		const section = href.replace('/#', '').replace('/', '');
		analytics.navigationClick(section);
	}

	function handleThemeToggle() {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		theme.toggle();
		analytics.themeToggle(newTheme);
	}

	function handleMobileMenuToggle() {
		const newState = !menuOpen;
		menuOpen = newState;
		analytics.mobileMenuToggle(newState);
	}

	const scrolledClass = $derived(scrolled
		? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm border-b border-slate-100 dark:border-slate-800'
		: ''
	);
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolledClass}"
>
	<nav class="max-w-5xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
		<!-- Logo -->
		<a href="/" class="font-bold text-lg text-slate-900 dark:text-slate-50 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
			Ken Shinzato
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden sm:flex items-center gap-8">
			{#each links as link}
				<a
					href={link.href}
					onclick={() => handleNavClick(link.href)}
					class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors py-2"
					class:border-b-2={isActive(link.href)}
					class:border-slate-900={isActive(link.href)}
					class:dark:border-slate-50={isActive(link.href)}
					class:text-slate-900={isActive(link.href)}
					class:dark:text-slate-50={isActive(link.href)}
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Theme Toggle Button -->
		<button
			type="button"
			onclick={handleThemeToggle}
			class="hidden sm:block p-2 text-slate-900 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
			aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
		>
			{#if currentTheme === 'light'}
				<!-- Moon icon (show dark mode) -->
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
				</svg>
			{:else}
				<!-- Sun icon (show light mode) -->
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zm0 2.828l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 011.414-1.414zM4.464 4.465l1.414-1.414a1 1 0 00-1.414-1.414L3.05 3.05a1 1 0 001.414 1.414z" clip-rule="evenodd" />
				</svg>
			{/if}
		</button>

		<!-- Mobile Hamburger Button -->
		<button
			type="button"
			onclick={handleMobileMenuToggle}
			class="sm:hidden p-2 text-slate-900 dark:text-slate-50 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
			aria-label="Toggle menu"
		>
			{#if menuOpen}
				<!-- X icon -->
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			{:else}
				<!-- Hamburger icon -->
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			{/if}
		</button>
	</nav>

	<!-- Mobile Navigation Menu -->
	{#if menuOpen}
		<div class="sm:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md">
			<div class="max-w-5xl mx-auto px-6 lg:px-8 py-4 space-y-3">
				{#each links as link}
					<a
						href={link.href}
						onclick={() => {
							handleNavClick(link.href);
							closeMobileMenu();
						}}
						class="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors"
						class:bg-slate-100={isActive(link.href)}
						class:dark:bg-slate-800={isActive(link.href)}
						class:text-slate-900={isActive(link.href)}
						class:dark:text-slate-50={isActive(link.href)}
					>
						{link.label}
					</a>
				{/each}
				<button
					type="button"
					onclick={() => {
						handleThemeToggle();
						closeMobileMenu();
					}}
					class="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors flex items-center gap-2"
					aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
				>
					{#if currentTheme === 'light'}
						<!-- Moon icon -->
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
						</svg>
						<span>Dark Mode</span>
					{:else}
						<!-- Sun icon -->
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zm0 2.828l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 011.414-1.414zM4.464 4.465l1.414-1.414a1 1 0 00-1.414-1.414L3.05 3.05a1 1 0 001.414 1.414z" clip-rule="evenodd" />
						</svg>
						<span>Light Mode</span>
					{/if}
				</button>
			</div>
		</div>
	{/if}
</header>

<style>
	header {
		background-color: transparent;
	}
</style>
