module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: [
    'react', 'react-native', 'import', 'unused-imports',
  ],
  rules: {
    'react/jsx-filename-extension': ['off'],
    'react/forbid-prop-types': ['off'],
    'no-nested-ternary': ['off'],
    'import/order': ['error'],
    'no-unused-vars': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_',
      },
    ],
    'no-plusplus': ['off'],
    'import/no-cycle': ['off'],
    'max-len': [1, 200, 4],

    'unused-imports/no-unused-imports': 'warn',

    'no-console': ['off'],
    'no-alert': ['off'],
    'no-empty-pattern': ['off'],
    'linebreak-style': ['off'],

  },
};
