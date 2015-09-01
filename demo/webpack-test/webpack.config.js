var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
    'main': ['./main.js']
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: "[name]-[hash]-[chunkhash].js",
    chunkFilename: "[name]-[hash]-[chunkhash].js",
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'},
      { test: /\.css$/, loader: ExtractTextPlugin.extract(
        "style-loader",
        "css-loader?sourceMap"
      )},
      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"}
    ]
  },

  plugins: [
  new webpack.DefinePlugin({
    NODE_ENV:"production"
}),
    new ExtractTextPlugin("css/[name].css", {
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin("common.js")
  ]
};
