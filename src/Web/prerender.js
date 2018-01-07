var render = require('./prerenderer');
module.exports = {
    default: render.default(require('./wwwroot/js/vue-ssr-client-manifest.json')),
};
