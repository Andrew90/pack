'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const CompressionPlugin = require("compression-webpack-plugin");
const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

const webpackCommon = {
  entry: {
    app: ['./app/initialize']
  },
  module: {
    rules: [
      ///*
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?presets[]=es2015'
          }
        ]
      },  
  //    */    
      {
        test: /\.jst$/,
        use: {
          loader: 'underscore-template-loader'
        }
      },
      {
        test: /\.css$/,
        //exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },      
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      } ,
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&amp;mimetype=application/font-woff&amp;name=[name].[ext]"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&amp;mimetype=application/font-woff&amp;name=[name].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&amp;mimetype=application/octet-stream&amp;name=[name].[ext]"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&amp;mimetype=image/svg+xml&amp;name=[name].[ext]"
      }
    ]

  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, './public'),
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new CopyWebpackPlugin([{
      from: './app/assets/index.html',
      to: './index.html'
    }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore',
      Backbone: 'backbone',
      Bb: 'backbone',
      Marionette: 'backbone.marionette',
      Mn: 'backbone.marionette',
    }),
/*
     new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            sequences     : true,
            booleans      : true,
            loops         : true,
            unused      : true,
            warnings    : false,
            drop_console: true,
            unsafe      : true
        }
    }),
*/
    new webpackUglifyJsPlugin({
  cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
  debug: true,
  minimize: true,
  sourceMap: false,
  output: {
    comments: false
  },
  compressor: {
    warnings: false
  }
}),

  //  new webpack.optimize.OccurrenceOrderPlugin(),
  //  new CompressionPlugin({
  //      asset: "[path].gz[query]",
  //      algorithm: "gzip",
  //      test: /\.js$|\.html$/,
  //      threshold: 10240,
  //      minRatio: 0.8
  //  })

  ],
  resolve: {
    modules: [
      path.join(__dirname, './node_modules'),
      path.join(__dirname, './app')
    ]
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, './node_modules')
    ]
  },
  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: "cheap-inline-module-source-map"
};

switch (process.env.npm_lifecycle_event) {
  case 'start':
  case 'dev':
    module.exports = merge(webpackCommon, {
      devtool: '#inline-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
      }
    });
    console.log('dev branch');
    break;
  default:
    module.exports = merge(webpackCommon, {
      devtool: 'source-map'
    });
     console.log('default branch');
    break;
}
