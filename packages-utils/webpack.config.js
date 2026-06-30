const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const path = require("path");

module.exports = {

  // Target: 'web', // 或者 'browserslist: defaults'
  mode: "none", // 或 'production'，或 'none'
  devtool: "source-map",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    library: "microUtil",
    path: path.resolve(__dirname, "lib"),
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      ".ts",
      ".js"
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
};
