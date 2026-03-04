import oclif from 'eslint-config-oclif'

export default [
  ...oclif,
  {
    ignores: [
      './lib',
      '**/*.js',
    ],
  },
  {
    files: [
      '**/*.ts',
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    rules: {
      '@stylistic/comma-dangle': 'warn',
      '@stylistic/function-paren-newline': 'warn',
      '@stylistic/indent': 'warn',
      '@stylistic/indent-binary-ops': 'warn',
      '@stylistic/lines-between-class-members': 'warn',
      '@stylistic/object-curly-newline': 'warn',
      '@stylistic/object-curly-spacing': 'warn',
      '@stylistic/operator-linebreak': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'array-callback-return': 'warn',
      camelcase: 'off',
      'import/namespace': 'warn',
      'mocha/no-mocha-arrows': 'warn',
      'n/shebang': 'warn',
      'no-await-in-loop': 'off',
      'no-else-return': 'warn',
      'node/no-missing-import': 'off',
      'perfectionist/sort-classes': 'warn',
      'perfectionist/sort-imports': 'warn',
      'perfectionist/sort-interfaces': 'warn',
      'perfectionist/sort-named-imports': 'warn',
      'perfectionist/sort-objects': 'warn',
      'prefer-arrow-callback': 'warn',
      'unicorn/filename-case': 'warn',
      'unicorn/no-anonymous-default-export': 'warn',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/numeric-separators-style': 'warn',
      'unicorn/prefer-node-protocol': 'warn',
      'unicorn/prefer-number-properties': 'warn',
    },
  },
]
