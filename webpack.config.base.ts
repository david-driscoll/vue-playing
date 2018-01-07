// tslint:disable-next-line:no-require-imports
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as webpack from 'webpack';

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
});

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
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preLoaders: {
                        ts: 'tslint-loader?formatter=verbose',
                    },
                    loaders: {
                        ts: ['ts-loader'],
                        scss: ['css-loader!sass-loader'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [tsLoader],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                ...tsLintLoader,
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        extractSass,
        new FriendlyErrorsPlugin(),
        new webpack.IgnorePlugin(/vue-ssr/),
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
