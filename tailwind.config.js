/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				'spin-fast': 'spin 0.75s linear infinite',
				'arrow': 'arrow 1s ease forwards',
			},
			keyframes: {
				arrow: {
					'0%, 50%, 100%': { transform: 'translateX(0px)' },
					'25%, 75%': { transform: 'translateX(5px)' },
				},
			},
		},
	},
	plugins: [],
}
