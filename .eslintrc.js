module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: './'
      }
    ],
    'react/prefer-stateless-function': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'no-plusplus': [
      'error',
      {
        'allowForLoopAfterthoughts': true
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
