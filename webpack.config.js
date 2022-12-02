const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { readFileSync } = require('fs');
const isDevelopment = process.env.NODE_ENV !== 'production';
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const config = {
  mode: isDevelopment ? 'development' : 'production',
  entry: [
    './src/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sp.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'swc-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    'static': {
      directory: './dist'
    },
    allowedHosts: ['all']
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) => readFileSync(__dirname+"/src/index.html", "utf-8"),
      filename: 'index.html',
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, 'backend')
    })
  ]
};

module.exports = config;