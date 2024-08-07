module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	rules: {
		'import/extensions': [
			'error',
			'always',
		],
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
			},
		],
		semi: ['error', 'never'],
		'arrow-parens': ['error', 'as-needed'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-underscore-dangle': 1,
		'nuxt/no-cjs-in-config': 'off',
	},
	overrides: [
		{
			files: ['bookmarklets/*.bookmarklet.js'],
			rules: {
				strict: 'off',
				'lines-around-directive': 'off',
				'no-console': 'off',
			},
		},
	],
}
