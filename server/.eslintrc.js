module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    amd: true,
  },
  extends: '@lacussoft',
  ignorePatterns: [
    '!.sequelizerc',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'linebreak-style': 'off',
    'no-console': 'off',
    'semi': ['error', 'always'],
    'semi-style': ['error', 'last'],
  },
};
