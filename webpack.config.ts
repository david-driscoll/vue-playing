import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import { cloneDeep } from 'lodash';
import { join, resolve } from 'path';
import { readdirSync } from 'fs';
import * as VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import config, { Environment } from './build/config';
import * as webpackConfig from './webpack.config.base';

const server = merge(cloneDeep(webpackConfig), {
    target: 'node',
    entry: {
        ssr: './client/entries/ssr-entry.ts',
    },
    output: {
        path: resolve(__dirname, config.server.output),
        libraryTarget: 'commonjs2',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js',
        },
    },
} as webpack.Configuration);

const client = merge(cloneDeep(webpackConfig), {
    target: 'web',
    entry: {
        browser: './client/entries/browser-entry.ts',
    },
    output: {
        path: resolve(__dirname, config.client.output),
        publicPath: '/js/',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.browser.js',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${config.environment}"`,
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return (
                    module.resource &&
                    (/\.jsx?$/.test(module.resource) ||
                        /\.tsx?$/.test(module.resource)) &&
                    module.resource.indexOf(resolve(__dirname, 'node_modules')) === 0
                );
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, 'static'),
                to: join(__dirname, config.client.output, config.assetsSubDirectory),
                ignore: ['.*'],
            },
        ]),

        // This plugins generates `vue-ssr-client-manifest.json` in the
        // output directory.
        new VueSSRClientPlugin(),
    ],
} as webpack.Configuration);

if (config.environment === Environment.production) {
    client.plugins!.push(
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            async: 'vendor-async',
            children: true,
            minChunks: 3,
        })
    );
}

module.exports = [client, server];
