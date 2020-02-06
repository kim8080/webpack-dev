const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const webpackMerge = require("webpack-merge");
const path = require("path");
const glob = require("glob");
const modeConfig = env => require(`./build/webpack.${env.mode}.js`)(env);

const PATHS = {
  src: path.join(__dirname, "src")
};

module.exports = env => {
  return webpackMerge(
    {
      mode: env.mode,
      plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].css"
        }),
        new PurgecssPlugin({
          paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
        })
      ]
    },
    modeConfig(env)
  );
};
