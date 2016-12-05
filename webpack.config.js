const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		main:   './src/main.ts',
		vendor: './src/vendor.js'
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
			// {
			// 	test: /\.vue$/,
      //   loader: 'vue-loader',
			// }
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