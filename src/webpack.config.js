// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
};
