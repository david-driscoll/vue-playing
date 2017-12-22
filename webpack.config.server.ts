import * as webpack from "webpack";
import * as config from './webpack.config';
import { merge } from 'lodash';

module.exports = merge(
    config,
    <webpack.Configuration>{
        entry: {
            'server': './client/server.ts',
        },
        target: "node",
        output: {
            libraryTarget: 'commonjs'
        }
    }
);