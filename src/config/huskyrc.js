const {resolveRwScripts} = require('../utils');

const RwScripts = resolveRwScripts();

module.exports = {
  hooks: {
    'pre-commit': `"${RwScripts}" pre-commit`,
  },
};
