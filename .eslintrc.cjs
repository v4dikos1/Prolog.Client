module.exports = {
	settings: {
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
			},
			typescript: {
				project: './tsconfig.node.json',
			},
			alias: {
				map: [['@', path.resolve(__dirname, './src')]],
				extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
			},
		},
	},
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended, plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsConfigRootDir: './',
	},
	plugins: ['@typescript-eslint', 'import', 'react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
}
