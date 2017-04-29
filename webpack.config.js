const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// process.traceDeprecation = true

module.exports = {

  // entry: {
  //  main: './src/main.ts',
  //  vendor: './src/vendor.ts',
  // },

  entry: './src/main.ts',

  output: {
    path: path.join(__dirname, 'build'),
    // publicPath: '/build/',
    filename: 'js/bundle.js',
    // filename: 'js/[name].bundle.js',
    // chunkFilename: 'js/[id].chunk.js',
    pathinfo: true,
  },

  resolve: {
    extensions: ['.ts', '.vue', '.js'],
    alias: {
      vue$: 'vue/dist/vue.common.js',
      Modules: path.resolve(__dirname, 'src/modules/'),
    },
  },

  module: {
    rules: [
      // {
      //  test: /\.html$/,
      //  loader: 'html-loader',
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
            // js: 'vue-ts-loader',
            ts: 'vue-ts-loader',
          },
          // esModule: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
          // sassLoader: {
          //   includePaths: [path.resolve(__dirname, './node_modules')],
          // },
        }),
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    // noInfo: true,
  },

  // performance: {
  //  hints: false
  // },

  plugins: [
    new ExtractTextPlugin('css/bundle.css'),
    new CopyWebpackPlugin([
      { from: 'src/index.html' },
      { from: 'public', to: 'public' },
    ]),
  ],

  devtool: "eval",
}

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }
