module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		'jest/globals': true,
	},
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 12,
		requireConfigFile: false,
	},
	rules: {
		'no-console': 'off',
		camelcase: 'off',
		'no-var': 'error',
		'eol-last': 'error',
		'object-curly-spacing': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'space-in-parens': [ 'error', 'always' ],
		'comma-spacing': [ 'error', { before: false, after: true } ],
		'keyword-spacing': [ 'error', { before: true, after: true } ],
		'no-multiple-empty-lines': 'error',
		indent: [ 'error', 'tab', { SwitchCase: 1 } ],
		'max-len': [ 2, 150, 4, { ignoreUrls: true, ignoreComments: true } ],
		'no-unused-vars': 'warn',
		'prefer-const': 'warn',
		'prettier/prettier': 'off',
		'jest/no-conditional-expect': 'off',
		'jest/expect-expect': 'off',
		'jest/no-done-callback': 'off',
		'jsdoc/check-tag-names': [ 'error', { 'definedTags': [ 'route', 'group', 'security', 'produces', 'consumes' ] } ],
		'jsdoc/require-property-description': 'off',
		'jsdoc/no-undefined-types': 'off',
	},
	overrides: [
		{
			files: [ 'test/*.test.js' ],
			rules: {
				'no-unused-expressions': 0,
			},
		},
	],
};
