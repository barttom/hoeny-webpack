const helpers = require('./helpers');
const HtmlWebpack = require('html-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    app:'./src/js/app.jsx',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
      filename: 'js/[name].[chunkhash].js',
      path: helpers.absolutePath('dev')
  },
  module:{
    loaders:
    [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query:{
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
            name: 'assets/img/[name].[ext]'
        }
      },

      {
        test: /\.scss$/,
        loaders: ['style-loader','css-loader?sourceMap=true', 'sass-loader'],
        exclude: /(node_modules)/
      },
      {
        test: /\.jsx$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        query: {
          configFile: './configs/eslintrc.json'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpack({
      template: './src/index.html',
      inject: 'body'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'compiled']
    }),

    new CleanWebpack(['dev'], {
      verbose: true,
      root: helpers.absolutePath('')
    })
  ],
  devServer:{
    port: 3005,
    host: 'localhost',
    historyApiFallback: true,
    contentBase: helpers.absolutePath('dev'),
    watchOptions:{
      aggregateTimeout: 200
    },
    stats: 'errors-only'
  }

};
