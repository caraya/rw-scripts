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
  !args.includes('--config') &&
  !hasFile('.markdownlint.json');

const config = useBuiltinConfig ?
  ['--config', hereRelative('../config/.markdownlint.json')] :
  [];

const defaultExtensions = 'md,mdx,markdown';
const ext = args.includes('--ext') ? [] : ['--ext', defaultExtensions];
const extensions = (parsedArgs.ext || defaultExtensions).split(',');

const useBuiltinIgnore =
  !args.includes('--ignore') &&
  !args.includes('--ignore-path') &&
  !hasFile('.markdownlintignore');

const ignore = useBuiltinIgnore ?
  ['--ignore-path', hereRelative('../config/.markdownlint.json')] :
  [];

const filesGiven = parsedArgs._.length > 0;

const filesToApply = filesGiven ? [] : ['.'];

if (filesGiven) {
  args = args.filter(
      (a) => !parsedArgs._.includes(a) || extensions.some((e) => a.endsWith(e)),
  );
}

const result = spawn.sync(
    resolveBin('markdownlint'),
    [...config, ...ext, ...ignore, ...args, ...filesToApply],
    {stdio: 'inherit'},
);

process.exit(result.status);
