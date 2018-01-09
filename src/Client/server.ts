import { createServerRenderer } from 'aspnet-prerendering';
import * as fs from 'fs';
import * as path from 'path';
import { createRenderer } from 'vue-server-renderer';
import { createApp } from './app';

// export default (bootstrap: { clientManifest: any; __dirname: string }) => {
//     const { clientManifest, __dirname } = bootstrap;
export default createServerRenderer(async params => {
    const contentRootPath = params.data.contentRootPath;
    const webRootPath = params.data.webRootPath;

    const clientManifest = JSON.parse(
        fs.readFileSync(
            path.join(webRootPath, '/js/vue-ssr-client-manifest.json'),
            'utf-8'
        )
    );

    // Step 2: Create a renderer
    const renderer = createRenderer({
        clientManifest,
        template: fs.readFileSync(
            path.join(contentRootPath, params.data.template),
            'utf-8'
        ),
    } as any);

    const { app } = createApp();
    // in 2.5.0+, returns a Promise if no callback is passed:
    const context: {
        renderStyles(): string;
        renderState(): string;
        renderScripts(): string;
        getPreloadFiles(): Array<{ file: string; extension: string; asType: string }>;
        renderResourceHints(): string;
    } = {
        title: 'test123',
        meta: 'asdf',
        ...params.data,
    } as any;
    const html = await renderer.renderToString(app, context);
    const styles = context.renderStyles();
    const scripts = context.renderScripts();
    const preloadFiles = context.getPreloadFiles();
    const resourceHints = context.renderResourceHints();
    const state = context.renderScripts();

    // var result = '<h1>Hello world!</h1>'
    //     + '<p>Current time in Node is: ' + new Date() + '</p>'
    //     + '<p>Request path is: ' + params.location.path + '</p>'
    //     + '<p>Absolute URL is: ' + params.absoluteUrl + '</p>';

    return { html, styles, scripts, preloadFiles, resourceHints, state };
});
// };
