const path = require('path');

const cwd = process.cwd();
// node node-test.js
// node ./misc/node-test.js
console.log('cwd: ', cwd, __dirname);
console.log('join: ', path.join(cwd, 'packages', 'aa'));
console.log('resolve: ', path.resolve(__dirname, './package.json'));
