const webpack = require("webpack");

var plugins = [new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
})].concat(process.env.NODE_ENV == "production" ? [new webpack.optimize.UglifyJsPlugin()] : []);

module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname + "/js",
        filename: "index.min.js"
    },
    plugins: plugins,
    module: {
        rules: [{
            test: /\.js/,
            loader: "babel-loader",
            options: {
                presets: ['react', 'es2015', 'es2016']
            }
        }]
    }
}