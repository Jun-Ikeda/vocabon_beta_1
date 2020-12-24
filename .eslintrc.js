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
    'react', 'react-native',
  ],
  rules: {
    'react/prefer-stateless-function': ['off'],
    'react/jsx-filename-extension': ['off'],
    'linebreak-style': ['off'],
    'no-console': ['off'],
    'no-alert': ['off'],
    'react/forbid-prop-types': ['off'],
    'no-nested-ternary': ['off'],
  },
};
