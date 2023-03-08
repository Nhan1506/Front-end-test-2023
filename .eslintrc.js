module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:storybook/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-definitons': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    "react/no-unescaped-entities": 0
  }
}