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
    extensions: ['.js', '.json', '.ts', '.vue', '*'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
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
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        // use: [
        //  'style-loader',
        //  'css-loader',
        //  'postcss-loader',
        // ],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // loader: 'css-loader!postcss-loader',
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        }),
      },
      // {
      //  test: /\.less$/,
      //  loader: ExtractTextPlugin.extract({
      //      fallback: "style-loader",
      //      loader: "css-loader!postcss-loader!less-loader",
      //  }),
      // },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        // use: [
        //  'style-loader',
        //  'css-loader',
        //  'postcss-loader',
        //  'sass-loader',
        // ],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // loader: 'css-loader!postcss-loader!sass-loader',
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
    new webpack.ProvidePlugin({
      _: "lodash",
    }),
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
