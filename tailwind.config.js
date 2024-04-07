/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				'spin-fast': 'spin 0.75s linear infinite',
				'arrow': 'arrow 1s ease forwards',
				'fadeIn': 'fadeIn 0.3s 0s ease forwards',
				'fadeOut': 'fadeOut 0.3s ease forwards',
			},
			keyframes: {
				arrow: {
					'0%, 50%, 100%': { transform: 'translateX(0px)' },
					'25%, 75%': { transform: 'translateX(5px)' },
				},
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateX(-100px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				fadeOut: {
					'0%': { opacity: '1', transform: 'translateX(0px)' },
					'100%': { opacity: '0', transform: 'translateX(100px)' },
				},
			},
		},
	},
	plugins: [],
}
