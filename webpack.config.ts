import * as webpack from 'webpack';
export const entry = 'abcd';

export const module: webpack.NewModule = {
    rules: [{
    test: /\.ts$/,
    use: 'ts-loader'
    }]
};