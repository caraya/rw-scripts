/* eslint-disable max-len */
const path = require('path');
const spawn = require('cross-spawn');
const yargsParser = require('yargs-parser');
const {resolveBin, hasFile} = require('../utils');
// const {hasPkgProp, resolveBin, hasFile, fromRoot} = require('../utils');

let args = process.argv.slice(2);
const here = (p) => path.join(__dirname, p);
const hereRelative = (p) => here(p).replace(process.cwd(), '.');
const parsedArgs = yargsParser(args);

const useBuiltinConfig =
  !hasFile('.markdownlint.json');

const config = useBuiltinConfig ?
  ['--config', hereRelative('../config/.markdownlint.json')] :
  [];

const defaultExtensions = 'md,markdown,mdx';
const ext = args.includes('--ext') ? [] : ['--ext', defaultExtensions];
const extensions = (parsedArgs.ext || defaultExtensions).split(',');

// const useBuiltinIgnore =
//   !args.includes('--ignore-path') &&
//   !hasFile('.eslintignore') &&
//   !hasPkgProp('eslintIgnore');

// const ignore = useBuiltinIgnore ?
//   ['--ignore-path', hereRelative('../config/eslintignore')] :
//   [];

// const cache = args.includes('--no-cache') ?
//   [] :
//   [
//     '--cache',
//     '--cache-location',
//     fromRoot('node_modules/.cache/.eslintcache'),
//   ];

const filesGiven = parsedArgs._.length > 0;

const filesToApply = filesGiven ? [] : ['.'];

if (filesGiven) {
  // we need to take all the flag-less arguments (the files that should be linted)
  // and filter out the ones that aren't js files. Otherwise json or css files
  // may be passed through
  args = args.filter(
      (a) => !parsedArgs._.includes(a) || extensions.some((e) => a.endsWith(e)),
  );
}

const result = spawn.sync(
    resolveBin('markdownlint-cli2'),
    [...config, ...ext, ...args, ...filesToApply],
    {stdio: 'inherit'},
);

process.exit(result.status);
