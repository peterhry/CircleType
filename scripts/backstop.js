'use strict';

const path = require('path');
const spawn = require('child_process').spawn;
const argv = require('minimist')(process.argv.slice(2));

console.log('Running Backstop');

const args = [
  path.join('node_modules', 'backstopjs', 'cli', 'index'),
];

if (process.env.TRAVIS_BRANCH === 'reference-images') {
  args.push('reference');
} else {
  args.push('test');
}

const backstop = spawn('node', args, { stdio: 'inherit' });

backstop.on('close', code => {
  if (code === 1) {
    console.error('Backstop failed!');
  } else {
    console.log('Backstop passed!');
  }
  process.exit(code);
});
