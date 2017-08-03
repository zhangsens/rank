const webpack = require("webpack");

module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname + "/js",
        filename: "index.min.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
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