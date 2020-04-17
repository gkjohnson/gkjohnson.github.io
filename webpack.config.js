const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: __dirname + '/index-inprogress.html',
    output: {
        path: __dirname ,
        filename: 'index.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'wc-loader' }]
            },
            {
                test: /\.js$/,
                use: [{ loader: 'script-loader' }]
            },
            {
                test: /\.jpeg$/,
                use: [{loader: 'url-loader'}]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template:'./empty-template.ejs',
            filename: 'index-inprogress.bundle.html'
        })
    ]
}