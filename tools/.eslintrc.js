module.exports = {
  extends: 'airbnb',
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      }
    ],
    'react/prefer-stateless-function': 'off',
  }
};
