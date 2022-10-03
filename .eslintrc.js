module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: ['airbnb-base'],
	rules: {
		indent: ['error', 'tab'],
		semi: ['error', 'never'],
		'arrow-parens': ['error', 'as-needed'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-underscore-dangle': 1,
		'nuxt/no-cjs-in-config': 'off',
	},
	overrides: [
		{
			files: ['src/*.bookmarklet.js'],
			rules: {
				strict: 'off',
				'lines-around-directive': 'off',
				'no-console': 'off',
			},
		},
	],
}
