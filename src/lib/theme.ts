export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme-preference';

/**
 * Get the initial theme from localStorage, system preference, or default to light
 */
export function getInitialTheme(): Theme {
	// 1. Check localStorage
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (stored === 'light' || stored === 'dark') {
			return stored;
		}
	}

	// 2. Check system preference
	if (typeof window !== 'undefined' && window.matchMedia) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// 3. Default to light
	return 'light';
}

/**
 * Set the theme and persist to localStorage
 */
export function setTheme(theme: Theme): void {
	if (typeof document !== 'undefined') {
		const html = document.documentElement;
		if (theme === 'dark') {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}

		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, theme);
		}
	}
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(current: Theme): Theme {
	return current === 'light' ? 'dark' : 'light';
}
