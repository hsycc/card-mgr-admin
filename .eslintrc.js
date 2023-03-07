module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },

  rules: {
    '@typescript-eslint/ban-types': 'warn',
  },
};
