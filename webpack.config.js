const path = require("path");

module.exports = {
  entry: "./js/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  //this is needed for a good debugging exprience in devtools
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
        // query: {
        //     presets: ["@babel/preset-env","@babel/preset-react"]
        // this is needed only if there is no .babelrc
        // }
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/
        // query: {
        //     presets: ["@babel/preset-env","@babel/preset-react"]
        // this is needed only if there is no .babelrc
        // }
      }
    ]
  }
};
