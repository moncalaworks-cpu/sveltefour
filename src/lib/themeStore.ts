import { writable } from 'svelte/store';
import type { Theme } from './theme';
import { getInitialTheme, setTheme } from './theme';

function createThemeStore() {
	const initial = getInitialTheme();
	const { subscribe, set } = writable<Theme>(initial);

	return {
		subscribe,
		set: (theme: Theme) => {
			setTheme(theme);
			set(theme);
		},
		toggle: () => {
			let current: Theme = 'light';
			const unsubscribe = subscribe((value) => {
				current = value;
			});
			unsubscribe();
			const newTheme: Theme = current === 'light' ? 'dark' : 'light';
			setTheme(newTheme);
			set(newTheme);
		}
	};
}

export const theme = createThemeStore();
