const path = require('path');

function resolve(url) {
  return path.resolve(__dirname, '..', url);
}

function srcPath(url = '') {
  return path.join(resolve('src'), url);
}

function rootPath(url = '') {
  return path.join(path.resolve(__dirname, '../../'), url);
}

function series(cmds) {
  return cmds.join(` & `);
}

module.exports = {
  resolve,
  srcPath,
  rootPath,
  series
};
