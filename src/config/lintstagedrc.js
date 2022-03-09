const {resolveRwScripts} = require('../utils');
// const {resolveRwScripts, resolveBin} = require('../utils');

const RwScripts = resolveRwScripts();
// const doctoc = resolveBin('doctoc');

module.exports = {
  '*.+(md|mdx|markdown)': [
    `${RwScripts} markdownlint`,
  ],
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|gql|graphql|mdx|vue)': [
    `${RwScripts} lint`,
    `${RwScripts} test --findRelatedTests`,
  ],
};
