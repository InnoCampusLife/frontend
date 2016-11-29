module.exports = {
    entry: './src/app.js',
    output: {
        path: './build/',
        publicPath: '/build/',
        filename: 'index.js'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "html" },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/ }
        ]
    },
    vue: {
        loaders: {
            js: 'babel?presets[]=es2015'
        }
    }
}