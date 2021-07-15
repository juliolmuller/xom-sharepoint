/* eslint-env node */
module.exports = {
  env: {
    'shared-node-browser': true,
    'es6': true,
    'jest': true,
  },
  extends: [
    'lacussoft',
    'lacussoft/typescript',
  ],
  ignorePatterns: [
    'build/',
    'dist/',
    '!.babelrc.js',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-underscore-dangle': 'off',
  },
};
