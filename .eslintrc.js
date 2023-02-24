module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@nuxt/eslint-config'],
  parserOptions: {
    'sourceType': 'module',
    'requireConfigFile': false,
  },
  rules: {
    'arrow-spacing': ['error', { before: true, after: true }],
    'block-spacing': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'eol-last': ['error', 'always'],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 2,
      'switchCase': 2,
      'ignores': []
    }],
    'key-spacing': 'error',
    'max-len': ['error', { code: 100, ignoreUrls: true }],
    'no-console': 'warn',
    'no-template-curly-in-string': 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'prefer-const': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    radix: 'error',
    semi: ['error', 'always'],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      { anonymous: 'never', named: 'never', asyncArrow: 'always' },
    ],
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'spaced-comment': ['error', 'always'],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 3
      },
      'multiline': {
        'max': 1
      }
    }]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
