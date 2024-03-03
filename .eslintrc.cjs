module.exports = {
	settings: {
		'import/resolver': {
			alias: {
				map: ['@', path.resolve(__dirname, './src')],
				extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
			},
		},
	},
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.node.json',
		tsConfigRootDir: './',
	},
	plugins: ['@typescript-eslint', 'import', 'react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
}
