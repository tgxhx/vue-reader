const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const { srcPath, rootPath, series } = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const shell = require('shelljs');
const colors = require('colors/safe');
const appConfig = require('../../config/app.config');
const serverConfig = require('../../config/server.config');

const root = rootPath();

console.log('root', root);

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: appConfig.publicPath,
  },
  devServer: {
    before() {
      shell.exec(
        series([`cd ${root}`, 'npm run start-server']),
        (code, stdout, stderr) => {
          console.log(colors.green(stdout));
          console.log(colors.red(stderr));
        }
      );
    },
    hot: true,
    port: appConfig.port,
    open: false,
    historyApiFallback: true,
    clientLogLevel: 'warning',
    inline: true,
    stats: 'errors-only',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    proxy: {
      '/api': `http://localhost:${serverConfig.port}`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.ejs',
      template: srcPath('../index.html'),
      favicon: srcPath('../favicon.ico'),
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      messages: [
        `You application is running here http://localhost:${appConfig.port}`,
      ],
    }),
  ],
});
