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
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        publicPath: './src/Web/',
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
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/js/',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.browser.js',
        },
    },
    plugins: [
        // Important: this splits the webpack runtime into a leading chunk
        // so that async chunks can be injected right after it.
        // this also enables better caching for your app/vendor code.
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
