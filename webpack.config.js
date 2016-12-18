const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path')

module.exports = {
	
	entry: {
		main:   './src/main.ts',
		vendor: './src/vendor.ts'
	},
	
	output: {
		path:'./build',
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
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader") 
			},
			{ 
				test: /\.less$/, 
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader"),
			},
			{ 
				test: /\.ts$/, 
				loader: "ts-loader" 
			},
			{ 
				test: /\.scss$/, 
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader"), 
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

	postcss: function () {
		return [require('autoprefixer'), require('postcss-flexbugs-fixes')];
	},

	sassLoader: {
		includePaths: [path.resolve(__dirname, "./node_modules")]
	},
	
	devServer: {
		historyApiFallback: {
			index: 'index.html'
		}
	}
}