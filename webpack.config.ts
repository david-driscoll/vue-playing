import * as webpack from 'webpack';

module.exports = <webpack.Configuration>{

    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: 'ts-loader'
        }],
    },
}
export const entry = 'abcd';
