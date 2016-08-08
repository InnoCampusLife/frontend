module.exports = {
    entry: './frontend/src/app.js',
    output: {
        path: './frontend/',
        publicPath: 'frontend/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "html" },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}