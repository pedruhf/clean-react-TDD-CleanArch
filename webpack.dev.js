const path = require("path");
const { DefinePlugin } = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" }
        ],
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist')
    },
    compress: true,
    open: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://fordevs.herokuapp.com/api")
    }),
    new HTMLWebpackPlugin({
      template: "./template.dev.html"
    })
  ]
})
