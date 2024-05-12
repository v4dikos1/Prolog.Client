import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 8000,
	},
	preview: {
		port: 8000,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
		},
	},
})
