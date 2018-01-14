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
    client: EntryConfig;
    server: EntryConfig;
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
            client: {
                output: 'dist/browser',
            },
            server: {
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
            client: {
                output: join(__dirname, '../server/wwwroot/js/'),
            },
            server: {
                output: join(__dirname, '../server/'),
            },
            devtool: 'source-map',
            // devtool: '#@eval-source-map',
            index: 'index.html',
            sourceMap: true,
            assetsSubDirectory: 'assets',
        };
        break;
}

export default config;
