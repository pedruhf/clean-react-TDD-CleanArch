const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main/index.tsx",
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "/public/js",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.join(__dirname, "src")
    }
  },
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
      directory: path.resolve(__dirname, './public')
    },
    compress: true,
    open: true,
    port: 3000,
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
