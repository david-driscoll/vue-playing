import { cloneDeep } from 'lodash';
import { join } from 'path';
import * as VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as config from './webpack.config.base';

const server = merge(cloneDeep(config), {
    target: 'node',
    entry: {
        prerenderer: './src/Client/server.ts',
    },
    output: {
        path: join(__dirname, 'src/Web/'),
        // publicPath: './src/Web/',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js',
        },
    },
} as webpack.Configuration);

const client = merge(cloneDeep(config), {
    target: 'web',
    entry: {
        client: './src/Client/client.ts',
    },
    output: {
        path: join(__dirname, 'src/Web/wwwroot/js/'),
        publicPath: '/js/',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.browser.js',
        },
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module =>
                module.context && module.context.includes('node_modules'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        // This plugins generates `vue-ssr-client-manifest.json` in the
        // output directory.
        new VueSSRClientPlugin(),
    ],
} as webpack.Configuration);

module.exports = [client, server];
