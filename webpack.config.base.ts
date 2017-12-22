import * as webpack from 'webpack';
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = <webpack.Configuration>{
    output: {
        pathinfo: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preloaders: {
                        js: 'tslint-loader',
                        ts: 'tslint-loader',
                    },
                    loaders: {
                        js: 'ts-loader',
                        ts: 'ts-loader',
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }, {
                    loader: 'tslint-loader'
                }]
            }
        ],
    },
    plugins: [
        new FriendlyErrorsPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.vue', '.js', '.jsx', '.json', '.css', '.scss']
    },
    performance: {
        hints: 'warning',

    },
    devtool: "source-map",
    stats: {
        colors: true,
        // assets: true,
        // cached: true,
        // cachedAssets: true,
        // children: true,
        // chunkModules: true,
        // chunkOrigins: true,
        // chunks: true,
        // env: true,
        // errorDetails: true,
        // errors: true,
        // hash: true,
        // modules: true,
        // moduleTrace: true,
        // performance: true,
        // providedExports: true,
        // publicPath: true,
        // reasons: true,
        // source: true,
        // timings: true,
        // usedExports: true,
        // version: true,
        // warnings: true,
    },
    // profile: true,
    // cache: true,

}
