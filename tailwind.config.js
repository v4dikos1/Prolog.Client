/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/tailwind-datepicker-react/dist/**/*.js'],
	theme: {
		extend: {
			animation: {
				'spin-fast': 'spin 0.75s linear infinite',
				'arrow': 'arrow 1s ease forwards',
				'fadeIn': 'fadeIn 0.3s ease forwards',
				'fadeOut': 'fadeOut 0.3s ease forwards',
				'hint': 'hint 0.2s ease forwards',
				'hint-hide': 'hint-hide 0.2s ease forwards',
			},
			keyframes: {
				'arrow': {
					'0%, 50%, 100%': { transform: 'translateX(0px)' },
					'25%, 75%': { transform: 'translateX(5px)' },
				},
				'fadeIn': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'fadeOut': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				'hint': {
					'0%': { opacity: 0, transform: 'scale(0)' },
					'100%': { opacity: 1, transform: 'scale(1)' },
				},
				'hint-hide': {
					'0%': { opacity: 1, transform: 'scale(1)' },
					'100%': { opacity: 0, transform: 'scale(0)' },
				},
			},
		},
	},
	plugins: [],
}
