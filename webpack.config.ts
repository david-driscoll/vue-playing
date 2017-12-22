import * as webpack from "webpack";
import * as config from './webpack.config.base';
import { cloneDeep, merge } from 'lodash';

const server = merge(
    cloneDeep(config),
    <webpack.Configuration>{
        target: "node",
        entry: {
            'server': './client/server.ts',
        },
        output: {
            publicPath: './dist/server/',
            libraryTarget: 'commonjs',
        }
    }
);

const client = merge(
    cloneDeep(config),
    <webpack.Configuration>{
        target: "web",
        entry: {
            'main': './client/app.ts',
        },
        output: {
            publicPath: './dist/app/',
        }
    }
);

module.exports = [client, server];