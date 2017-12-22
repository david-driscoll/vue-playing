import { createServerRenderer } from 'aspnet-prerendering';
import Vue from 'vue';

export default createServerRenderer(async function (params) {
    // Step 1: Create a Vue instance
    const app = new Vue({
        template: `<div>Hello World 12312312</div>`
    });

    // Step 2: Create a renderer
    const renderer = require('vue-server-renderer').createRenderer();

    // in 2.5.0+, returns a Promise if no callback is passed:
    const html = await renderer.renderToString(app);
    // var result = '<h1>Hello world!</h1>'
    //     + '<p>Current time in Node is: ' + new Date() + '</p>'
    //     + '<p>Request path is: ' + params.location.path + '</p>'
    //     + '<p>Absolute URL is: ' + params.absoluteUrl + '</p>';

    return ({ html });
});
