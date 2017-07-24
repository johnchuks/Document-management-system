const webpack = require('webpack');
const path = require('path');
const env = require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');


process.env.NODE_ENV = 'production';
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  entry: './client/app/src/components/App.jsx',
  target: 'web',
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
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['react-html-attrs',
              'transform-class-properties',
              'transform-decorators-legacy'
            ]
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
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new ExtractTextPlugin('css/style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process': {
        'env': {
          'JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
        }
      }
    })
  ]
};

