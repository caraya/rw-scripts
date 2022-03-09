#!/usr/bin/env node
/* eslint-disable max-len */
let shouldThrow = false;

try {
  const [major, minor] = process.version.slice(1).split('.').map(Number);
  shouldThrow =
    require(`${process.cwd()}/package.json`).name === 'rw-scripts' &&
    (major < 12 || (major === 12 && minor < 13));
} catch (error) {
  // ignore
}

if (shouldThrow) {
  throw new Error(
      'You must use Node version 12.13 or greater to run the scripts within rw-scripts, because we dogfood the untranspiled version of the scripts.',
  );
}

require('./run-script');
