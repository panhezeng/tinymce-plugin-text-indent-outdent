const path = require("path");
const config = {
  output: {
    path: path.resolve(__dirname, "dist/tinymce-plugin-text-indent-outdent"),
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
  plugins: []
};

module.exports = (env, argv) => {
  return config;
};
