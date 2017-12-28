// tslint:disable-next-line:no-require-imports
import FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
import * as webpack from 'webpack';

const tsLintLoader = {
    // test: /\.ts$/,
    loader: 'tslint-loader',
    // exclude: /(node_modules)/,
    options: {
        formatter: 'verbose',
        typeCheck: true,
        tsConfigFile: 'tsconfig.lint.json',
    },
};

const tsLoader = {
    loader: 'ts-loader',
    options: {
        appendTsSuffixTo: [/\.vue[^x]?$/],
        appendTsxSuffixTo: [/\.vuex$/],
    },
};

module.exports = {
    output: {
        pathinfo: true,
    },
    module: {
        rules: [
            // { enforce: 'pre', ...tsLintLoader },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preLoaders: {
                        ts: 'tslint-loader?formatter=verbose',
                    },
                    loaders: {
                        ts: ['ts-loader'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    tsLoader,
                ],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                ...tsLintLoader,
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
