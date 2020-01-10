const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  output: {
    path: path.resolve(__dirname, "dist/text-indent-outdent"),
    filename: "plugin.min.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|dist/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  },
  externals: {
    tinymce: "tinymce"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ context: "static", from: "**/*" }])
  ]
};

module.exports = (env, argv) => {
  return config;
};
