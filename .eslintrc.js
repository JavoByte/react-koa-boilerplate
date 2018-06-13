module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended'
  ],
  plugins: [
    'flowtype'
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  globals: {
    __DEV__: true,
  },
  rules: {
    'react/prefer-stateless-function': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        'components': [ 'Link' ],
        'specialLink': [ 'to' ],
      }
    ],
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
