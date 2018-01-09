// tslint:disable-next-line:no-require-imports
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import { posix } from 'path';
import * as webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
    filename: isProduction ? '[name].[contenthash].css' : '[name].css',
    disable: !isProduction,
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

function cssLoaders(options: any = {}) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
        },
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
        },
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader?: string, loaderOptions?: any) {
        // const loaders = options.usePostCSS
        //     ? ['cache-loader', cssLoader, postcssLoader]
        //     : ['cache-loader', cssLoader];
        // const loaders = ['cache-loader', cssLoader];
        const loaders = [cssLoader];

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: {
                    ...loaderOptions,
                    sourceMap: options.sourceMap,
                },
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return extractSass.extract({
                use: loaders,
                fallback: 'vue-style-loader',
            });
        } else {
            return ['vue-style-loader'].concat(loaders as any);
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus'),
    };
}

function styleLoaders(options: any = {}) {
    const output = [];
    const loaders = cssLoaders(options);

    // tslint:disable-next-line:forin
    for (const extension in loaders) {
        const loader = (loaders as any)[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader,
        });
    }

    return output;
}

function assetsPath(path: string) {
    return posix.join(__dirname, 'src/Web/wwwroot/js', path);
}

module.exports = {
    output: {
        pathinfo: true,
        filename: isProduction ? '[name].[contenthash].js' : '[name].js',
        chunkFilename: isProduction
            ? '[name].[contenthash].bundle.js'
            : '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: isProduction,
                    preLoaders: {
                        ts: 'tslint-loader?formatter=verbose',
                    },
                    loaders: {
                        // ts: ['cache-loader!ts-loader'],
                        ts: ['ts-loader'],
                        ...cssLoaders({
                            sourceMap: true,
                            extract: isProduction,
                        }),
                    },
                    cssSourceMap: true,
                    cacheBusting: !isProduction,
                    transformToRequire: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href',
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                // use: ['cache-loader', tsLoader],
                use: [tsLoader],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                ...tsLintLoader,
            },
            ...styleLoaders({
                sourceMap: true,
                extract: isProduction,
                usePostCSS: true,
            }),
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    fallback: 'file-loader',
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    fallback: 'file-loader',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    fallback: 'file-loader',
                },
            },
        ],
    },
    plugins: [
        // // it is common to extract deps into a vendor chunk for better caching.
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: module => {
        //         // a module is extracted into the vendor chunk when...
        //         return (
        //             // if it's inside node_modules
        //             /node_modules/.test(module.context) &&
        //             // do not externalize if the request is a CSS file
        //             !/\.css$/.test(module.request)
        //         );
        //     },
        // }),
        extractSass,
        new FriendlyErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.vue', '.js', '.jsx', '.json', '.css', '.scss'],
    },
    performance: {
        hints: 'warning',
    },
    devtool: 'source-map',
    // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
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
