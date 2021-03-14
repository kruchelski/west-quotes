/* eslint-env node */
module.exports = {
  root: true,
  env: {
    'es6': true,
    'react-native/react-native': true,
  },
  extends: [
    '@lacussoft',
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended',
  ],
  globals: {
    alert: true,
    console: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'import',
    'react',
    'react-hooks',
    'react-native',
    'jsx-control-statements',
  ],
  rules: {
    'linebreak-style': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'object-curly-newline': ['error', { ImportDeclaration: { multiline: true, minProperties: 6 } }],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/prop-types': 'off',
    'semi': ['error', 'always'],
    'semi-style': ['error', 'last'],
  },
};
