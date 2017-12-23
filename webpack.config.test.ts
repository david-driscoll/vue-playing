import { resolve } from "path";
import * as webpack from "webpack";
import * as config from "./webpack.config";

const me: webpack.Configuration = module.exports = (config as any)[0];

// exclude NPM deps from test bundle
// tslint:disable-next-line:no-var-requires
me.externals = [require("webpack-node-externals")()];
// use inline source map so that it works with mocha-webpack
me.devtool = "#inline-source-map";
// use absolute paths in sourcemaps (important for debugging via IDE)
// me.output!.devtoolModuleFilenameTemplate = "[absolute-resource-path]";
// me.output!.devtoolFallbackModuleFilenameTemplate = "[absolute-resource-path]?[hash]";
const m: webpack.NewModule = me.module as webpack.NewModule;
// me.target = "node";

if (process.env.NODE_ENV === "coverage") {
    m.rules.splice(1, 0, {
        test: /\.(jsx?|tsx?|.vue)/,
        include: resolve("src"),
        use: {
            loader: "istanbul-instrumenter-loader",
            options: {
                esModules: true,
                produceSourceMap: true,
                compact: false,
            },
        },
    });

    (m.rules[0] as any).options.loaders.ts.unshift({
        loader: "istanbul-instrumenter-loader",
        options: {
            esModules: true,
            // produceSourceMap: true,
            compact: false,
        },
    });
    (m.rules[0] as any).options.loaders.js.unshift({
        loader: "istanbul-instrumenter-loader",
        options: {
            esModules: true,
            // produceSourceMap: true,
            compact: false,
        },
    });
}
