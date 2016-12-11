const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		main:   './src/main.ts',
		vendor: './src/vendor.ts'
	},
	output: {
		path: './build/',
		// publicPath: 'build',
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[id].chunk.js' 
	},
	resolve: {
		extensions: ["", ".ts", ".js"]
	},
	module: {
		loaders: [
			{ 
				test: /\.html$/, 
				loader: "html" 
			},
			{ 
				test: /\.vue$/,  
				loader: 'vue' 
			},
			{ 
				test: /\.js$/,   
				loader: 'babel?presets[]=es2015', 
				exclude: /node_modules/ 
			},
			{ 
				test: /\.css$/,  
				loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
			},
			{ 
				test: /\.less$/, 
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") 
			},
			{ test: /\.ts$/, 
				loader: "ts-loader" 
			},

			{ test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
      // { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
			{
				test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file?name=fonts/[name].[ext]"
			},
		]
	},
	plugins: [
		new ExtractTextPlugin("css/[name].bundle.css")
	],
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