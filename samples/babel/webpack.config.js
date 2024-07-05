const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // env 介绍： https://segmentfault.com/p/1210000008466178
            presets: ['env'],
            plugins: [
              ["transform-runtime", {
                "helpers": false, // defaults to true
                "polyfill": false, // defaults to true
                "regenerator": true, // defaults to true
                "moduleName": "babel-runtime" // defaults to "babel-runtime"
              }]
            ]
          }
        }
      }
    ]
  }
 };
