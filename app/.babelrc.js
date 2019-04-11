module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'webpack-async-module-name',
  ],
};
