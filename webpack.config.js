const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[contenthash].js",
  },
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  optimization: {
    minimize: process.env.NODE_ENV === "production" ? true : false,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: process.env.NODE_ENV === "production" ? 8080 : 3000,
  },
};
