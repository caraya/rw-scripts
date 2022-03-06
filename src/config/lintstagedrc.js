const {resolveRwScripts, resolveBin} = require('../utils');

const RwScripts = resolveRwScripts();
const doctoc = resolveBin('doctoc');

module.exports = {
  'README.md': [`${doctoc} --maxlevel 3 --notitle`],
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|gql|graphql|mdx|vue)': [
    `${RwScripts} format`,
    `${RwScripts} lint`,
    `${RwScripts} test --findRelatedTests`,
  ],
};
