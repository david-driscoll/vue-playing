import * as webpack from "webpack";
import * as config from './webpack.config.base';
import { cloneDeep, merge } from 'lodash';

const server = merge(
    cloneDeep(config),
    <webpack.Configuration>{
        target: "node",
        entry: {
            'prerenderer': './src/Client/server.ts',
        },
        output: {
            filename: './src/Web/[name].js',
            // publicPath: './src/Web/prerenderer',
            libraryTarget: 'commonjs',
        },
        resolve: {
            alias: {
                // 'vue': 'vue/dist/vue.esm.js',
            }
        }
    }
);

const client = merge(
    cloneDeep(config),
    <webpack.Configuration>{
        target: "web",
        entry: {
            'client': './src/Client/client.ts',
        },
        output: {
            filename: './src/Web/wwwroot/js/[name].js',
            publicPath: '/js/',
        },
        resolve: {
            alias: {
                'vue': 'vue/dist/vue.esm.browser.js',
            }
        }
    }
);

module.exports = [client, server];