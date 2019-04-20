const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const { srcPath } = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const config = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
  },
  devtool: 'source-map',
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
    splitChunks: {
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
          // test: 'verder'使用entry指定的模块
          test: /[\\/]node_modules[\\/]/, // 使用来自node_modules的模块
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.ejs',
      template: srcPath('../index.html'),
      favicon: srcPath('../favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
});

if (process.env.ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
