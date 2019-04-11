'use strict';
const env = process.env.NODE_ENV;

if (env === 'development') {
  module.exports = require('./build/webpack.dev');
} else {
  module.exports = require('./build/webpack.prod');
}
