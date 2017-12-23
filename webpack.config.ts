import { cloneDeep, merge } from 'lodash';
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
            filename: './src/Web/[name].js',
            // publicPath: './src/Web/prerenderer',
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
            filename: './src/Web/wwwroot/js/[name].js',
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
