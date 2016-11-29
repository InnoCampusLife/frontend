module.exports = {
  entry: './src/app.js',
  output: {
    path: './build/',
    // publicPath: 'build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "html" },
      { test: /\.css$/,  loader: 'style!css' },
      { test: /\.vue$/,  loader: 'vue' },
      { test: /\.js$/,   loader: 'babel?presets[]=es2015', exclude: /node_modules/ },
      { test: /\.less$/, loader: "style!css!less" }
    ]
  },
  vue: {
    loaders: {
      js: 'babel?presets[]=es2015'
    }
  },
  devServer: {
    historyApiFallback: {
			index: 'index.html'
		}
  }
}