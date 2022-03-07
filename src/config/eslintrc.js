const {ifAnyDep} = require('../utils');

module.exports = {
  extends: [
    require.resolve('eslint-config-google'),
    ifAnyDep('react', require.resolve('eslint-plugin-jsx-a11y')),
    ifAnyDep('react', require.resolve('eslint-plugin-react')),
  ].filter(Boolean),
  rules: {},
};
