// tslint:disable-next-line:no-require-imports
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import { posix, resolve } from 'path';
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import * as webpack from 'webpack';
import config, { Environment } from './build/config';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isProduction = config.environment === Environment.production;
const isDevelopment = config.environment === Environment.development;
console.log({ isProduction, isDevelopment });

const extractSass = new ExtractTextPlugin({
    filename: isProduction ? '[name].[contenthash:6].css' : '[name].css',
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
    return posix.join(__dirname, 'server/wwwroot/js', path);
}

const webpackConfig = {
    output: {
        pathinfo: true,
        filename: isProduction ? '[name].[hash:6].js' : '[name].js',
        chunkFilename: isProduction ? '[name].[hash:6].bundle.js' : '[name].bundle.js',
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
                            sourceMap: config.sourceMap,
                            extract: isProduction,
                        }),
                    },
                    cssSourceMap: config.sourceMap,
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
            // {
            //     test: /\.tsx?$/,
            //     exclude: /node_modules/,
            //     use: [tsLintLoader],
            // },
            ...styleLoaders({
                sourceMap: config.sourceMap,
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
        extractSass,
        new FriendlyErrorsPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            generateStatsFile: true,
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.vue', '.js', '.jsx', '.json', '.css', '.scss'],
    },
    performance: {
        hints: isProduction ? 'warning' : false,
    },
    devtool: config.devtool,
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
        // warnings: isProduction,
    },
    // profile: true,
    // cache: true,
} as webpack.Configuration;

module.exports = webpackConfig;

if (isDevelopment) {
    webpackConfig.plugins!.push(
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: false,
        })
    );
}
if (isProduction) {
    webpackConfig.plugins!.push(
        new UglifyJSPlugin({
            // parallel: true,
            sourceMap: true,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: { safe: true, map: { inline: false } },
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin()
        // enable scope hoisting
        // new webpack.optimize.ModuleConcatenationPlugin()
    );
}
