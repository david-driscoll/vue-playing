import { cloneDeep, merge } from 'lodash';
import { join } from 'path';
import * as webpack from 'webpack';
import * as config from './webpack.config.base';

const server = merge(
    cloneDeep(config),
    {
        target: 'node',
        entry: {
            prerenderer: './src/Client/server.ts',
        },
        output: {
            path: join(__dirname, 'src/Web/'),
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
            publicPath: './src/Web/',
            libraryTarget: 'commonjs',
        },
        resolve: {
            alias: {
                vue: 'vue/dist/vue.esm.js',
            },
        },
    } as webpack.Configuration
);

const client = merge(
    cloneDeep(config),
    {
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
    } as webpack.Configuration
);

module.exports = [client, server];
