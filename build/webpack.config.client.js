const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const devServer = {
    port: 8002,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    historyApiFallback: {
        index: '/public/index.html'
    },
    hot: true
    // open: true
}

const defaultPlugins = [
    new Webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, './template.html')
    }),
    new VueClientPlugin()
]

let config
if (isDev) {
    config = merge(baseConfig, {
        module: {
            rules: [
                {
                    test: /\.styl$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {loader: 'postcss-loader', options: {sourceMap: true}},
                        'stylus-loader'
                    ]
                }
            ]
        },
        devtool: '#cheap-module-eval-source-map',
        devServer,
        plugins: defaultPlugins.concat([
            new Webpack.HotModuleReplacementPlugin(),
            new Webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            {loader: 'postcss-loader', options: {sourceMap: true}},
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new ExtractTextPlugin('style.[contentHash:8].css'),
            new Webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new Webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}

module.exports = config
