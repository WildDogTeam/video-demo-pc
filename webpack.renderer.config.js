'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const pkg = require('./app/package.json')
const settings = require('./config.js')
const webpack = require('webpack')
const config = require('./config/index.js')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rendererConfig = {
  devtool: '#eval-source-map',
  devServer: { overlay: true },
  entry: {
    renderer: path.join(__dirname, 'app/src/renderer/main.js')
  },
  externals: Object.keys(pkg.dependencies || {}),
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.resolve(__dirname, 'app/src/renderer')],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
    // noParse: ['ws']

  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.ejs',
      appModules: process.env.NODE_ENV !== 'production' ?
        path.resolve(__dirname, 'app/node_modules') : false
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'app/dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'renderer': path.join(__dirname, 'app/src/renderer'),
      '@': path.join(__dirname, 'app/src/renderer'),
      'assets': path.resolve(__dirname, 'app/src/renderer/assets'),
      'components': path.resolve(__dirname, 'app/src/renderer/components'),
      'views': path.resolve(__dirname, 'app/src/renderer/views'),
      'styles': path.resolve(__dirname, 'app/src/renderer/styles'),
      'api': path.resolve(__dirname, 'app/src/renderer/api'),
      'utils': path.resolve(__dirname, 'app/src/renderer/utils'),
      'store': path.resolve(__dirname, 'app/src/renderer/store'),
      'router': path.resolve(__dirname, 'app/src/renderer/router'),
      'config': path.resolve(__dirname, 'app/src/renderer/config.js')
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node'],
    modules: [
      path.join(__dirname, 'app/node_modules'),
      path.join(__dirname, 'node_modules')
    ]
  },
  target: 'electron-renderer'
}

if (process.env.NODE_ENV !== 'production') {
  // if (settings.eslint) {
  //   rendererConfig.module.rules.push({
  //     test: /\.(js|vue)$/,
  //     enforce: 'pre',
  //     exclude: /node_modules/,
  //     use: {
  //       loader: 'eslint-loader',
  //       options: {
  //         formatter: require('eslint-friendly-formatter')
  //       }
  //     }
  //   })
  // }
  console.log(config.dev)
  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    })
  )
}

/**
 * Adjust rendererConfig for production settings
 */
// if (process.env.NODE_ENV === 'production') {
//   rendererConfig.devtool = ''

//   rendererConfig.plugins.push(
//     new webpack.DefinePlugin({
//       'process.env': config.build.env
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       }
//     })
//   )
// }

module.exports = rendererConfig
