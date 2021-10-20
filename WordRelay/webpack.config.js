const path = require("path");
const RefreshHotLoading = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "WordRelay Setting",
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["react-refresh/babel"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [new RefreshHotLoading()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/",
  },
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
