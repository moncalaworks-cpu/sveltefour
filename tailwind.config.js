/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				slate: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
					950: '#030712'
				}
			},
			spacing: {
				128: '32rem'
			},
			typography: {
				DEFAULT: {
					css: {
						color: '#1f2937',
						a: {
							color: '#1f2937',
							textDecoration: 'underline',
							fontWeight: '500'
						}
					}
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
