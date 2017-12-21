import { createServerRenderer } from 'aspnet-prerendering';

module.exports = createServerRenderer(function (params) {
    return new Promise(resolve => {
        var result = '<h1>Hello world!</h1>'
            + '<p>Current time in Node is: ' + new Date() + '</p>'
            + '<p>Request path is: ' + params.location.path + '</p>'
            + '<p>Absolute URL is: ' + params.absoluteUrl + '</p>';

        resolve({ html: result });
    });
});
