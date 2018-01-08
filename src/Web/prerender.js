var render = require('./prerenderer');

console.log(__dirname, __filename);
console.log(render);
module.exports = {
    default: render.default({
        clientManifest: require('./wwwroot/js/vue-ssr-client-manifest.json'),
        __dirname,
    }),
};
