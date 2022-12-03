const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { readFileSync } = require('fs');
const isDevelopment = process.env.NODE_ENV !== 'production';
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const config = {
  mode: isDevelopment ? 'development' : 'production',
  entry: [
    './src/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sp.[contenthash].js'
  },
  experiments: {
    asyncWebAssembly: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      fs: false,
      backend: path.resolve(__dirname, 'backend/pkg'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'swc-loader',
        exclude: /node_modules/,
        options: {
          jsc: {
              parser: {
                  syntax: "typescript",
                  jsx: true
              }
          }
        }
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
  devtool: isDevelopment ? 'source-map' : false,
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
    }),
    new webpack.ProvidePlugin({
      "React": "react",
   }),
  ]
};

module.exports = config;