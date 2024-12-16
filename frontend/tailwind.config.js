/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				playfair: ['"Playfair Display"', 'serif'],
				inter: ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {},
			boxShadow: {
				white: '0 0 0 3px rgba(0, 0, 0, 0.05)',
			},
		},
	},
	daisyui: {
		themes: [
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#FF073A',
					secondary: '#BC13FE',
					accent: 'FF5C00',
				},
			},
		],
	},
	plugins: [require('daisyui'), require('tailwindcss-animate')],
};
