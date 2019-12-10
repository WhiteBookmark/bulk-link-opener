module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
};
