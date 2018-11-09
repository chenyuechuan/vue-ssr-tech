const path = require('path')
// const Webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const createVueLoaderOptions = require('./vue-loader.config')
const config = {
    target: 'web',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist'),
        publicPath: 'http://127.0.0.1:8002/public/'
    },
    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre' // 加强; 强迫服从; 实施，执行
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resoursce/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}


module.exports = config
