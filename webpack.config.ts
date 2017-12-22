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
            publicPath: './src/Web/prerenderer',
            libraryTarget: 'commonjs',
        }
    }
);

const client = merge(
    cloneDeep(config),
    <webpack.Configuration>{
        target: "web",
        entry: {
            'app': './src/Client/app.ts',
        },
        output: {
            publicPath: './src/Web/wwwroot/js/',
        }
    }
);

module.exports = [client, server];