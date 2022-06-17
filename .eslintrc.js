module.exports = {
  root: true,
  extends: [require.resolve('verify-fabric/dist/eslint')],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'compat/compat': 0,
  },
};
