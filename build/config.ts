import { join } from 'path';
import { Options } from 'webpack';

export enum Environment {
    development = 'development',
    production = 'production',
    test = 'test',
    coverage = 'coverage',
}

const environment = Environment[
    (process.env.NODE_ENV || 'development') as any
] as Environment;
let config: Config;

export interface EntryConfig {
    output: string;
}

export interface Config {
    environment: Environment;
    browser: EntryConfig;
    ssr: EntryConfig;
    sourceMap: boolean;
    devtool: Options.Devtool;
    index: string;
    assetsSubDirectory: string;
}

switch (environment) {
    // case Environment.coverage:
    // case Environment.test:
    case Environment.production:
        config = {
            environment,
            browser: {
                output: 'dist/browser',
            },
            ssr: {
                output: 'dist/ssr',
            },
            devtool: 'source-map',
            index: 'index.html',
            sourceMap: true,
            assetsSubDirectory: 'assets',
        };
        break;

    case Environment.development:
    default:
        config = {
            environment,
            browser: {
                output: join(__dirname, '../server/wwwroot/js/'),
            },
            ssr: {
                output: join(__dirname, '../server/'),
            },
            devtool: '#@inline-source-map',
            index: 'index.html',
            sourceMap: true,
            assetsSubDirectory: 'assets',
        };
        break;
}

export default config;
