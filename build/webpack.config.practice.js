const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const devServer = {
    port: 8080,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    hot: true
    // open: true
}

const defaultPlugins = [
    new Webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
    })
]

let config

config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
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
    resolve: {
        alias: {
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: defaultPlugins.concat([
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoEmitOnErrorsPlugin()
    ])
})

module.exports = config
