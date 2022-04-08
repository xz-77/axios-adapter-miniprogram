module.exports = {
  root: true,
  extends: [require.resolve('verify-fabric/dist/eslint')],
  parserOptions: {
    project: './tsconfig.base.json',
  },
  rules:{
    'compat/compat':0
  }
};
