/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				playfair: ['"Playfair Display"', 'serif'],
				inter: ['Inter', 'sans-serif'],
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
	plugins: [require('daisyui')],
};
