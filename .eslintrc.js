module.exports = {
	root: true,

	env: {
		node: true,
	},

	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],

	rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'graphql/template-strings': [
        'error',
        {
          env: 'literal',
          projectName: 'app',
          schemaJsonFilepath: 'node_modules/.temp/graphql/schema.json'
        }
      ]
    },

	parserOptions: {
		parser: '@typescript-eslint/parser',
	},

	plugins: ['graphql'],
};
