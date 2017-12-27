import { createServerRenderer } from 'aspnet-prerendering';

import { createApp } from './app';

export default createServerRenderer(async (params) => {
    // Step 2: Create a renderer
    const renderer = (await import('vue-server-renderer')).createRenderer();

    const { app } = createApp();
    // in 2.5.0+, returns a Promise if no callback is passed:
    const html = await renderer.renderToString(app);
    // var result = '<h1>Hello world!</h1>'
    //     + '<p>Current time in Node is: ' + new Date() + '</p>'
    //     + '<p>Request path is: ' + params.location.path + '</p>'
    //     + '<p>Absolute URL is: ' + params.absoluteUrl + '</p>';

    return ({ html });
});
