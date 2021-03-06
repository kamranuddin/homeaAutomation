'use strict'

var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var isProduction = process.env.NODE_ENV === 'production'
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : []

console.log('[webpack.server.config.js] __dirname: ', __dirname)
console.log('[webpack.server.config.js] process.cwd(): ', process.cwd())

module.exports = {
  devtool: 'sourcemap',
  entry: './server/index.js',
  output: {
    path: path.resolve('./server/dist/'),
    filename: 'build.js',
    libraryTarget: 'commonjs2',
    publicPath: '../public'
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  externals: nodeExternals(),
  plugins: [
		new webpack.ProvidePlugin({
			_: 'lodash'
		}),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install()',
      raw: true,
      entryOnly: false 
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          "plugins": ["add-module-exports", "transform-decorators-legacy", "jsx-control-statements"],
          "presets": ["es2015", "react", "stage-0"]
        }
      }, {
        test: /\.json?$/,
        loader: 'json-loader'
      }, {
        test: /\.scss$/,
        include: /.client/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }, {
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000000'
			}
    ]
  }
}
