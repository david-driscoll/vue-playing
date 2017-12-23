// tslint:disable-next-line:no-require-imports
import FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
import { resolve } from 'path';
import * as webpack from 'webpack';

const tsLintLoader =

module.exports = {
    output: {
        pathinfo: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preLoaders: {
                        js: 'tslint-loader?formatter=codeFrame',
                        ts: 'tslint-loader?formatter=codeFrame',
                    },
                    loaders: {
                        js: [
                            {
                                loader: 'ts-loader',
                            },
                        ],
                        ts: [
                            {
                                loader: 'ts-loader',
                            },
                        ],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue[^x]?/],
                            appendTsxSuffixTo: [/\.vuex/],
                        },
                    },
                    {
                        loader: 'tslint-loader',
                        options: {
                            formatter: 'codeFrame',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new FriendlyErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.vue', '.js', '.jsx', '.json', '.css', '.scss'],
    },
    performance: {
        hints: 'warning',

    },
    devtool: 'source-map',
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

} as webpack.Configuration;
