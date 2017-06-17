const webpack = require('webpack');
const path = require('path');
const env = require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './client/app/src/components/App.jsx',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/client/app/public`
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {

    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        }),
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'style-loader', 'resolve-url-loader'],
      },

      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=1000000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg|png|jpe?g)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=/[name].[ext]'
      },
      { test: /\.json$/, loader: 'json-loader' },
    ]
  },
};
module.exports = config;
