import { createServerRenderer } from 'aspnet-prerendering';

export default createServerRenderer(async function (params) {
    var result = '<h1>Hello world!</h1>'
        + '<p>Current time in Node is: ' + new Date() + '</p>'
        + '<p>Request path is: ' + params.location.path + '</p>'
        + '<p>Absolute URL is: ' + params.absoluteUrl + '</p>';

    return ({ html: result });
});
