const parser = require('vue-loader/lib/parser');
const fs = require('fs');
const path = require('path');
const tsnode = require('ts-node').register();

require.extensions['.vue'] = function(m, filename) {
    require.resolve(filename);
    const component = parser(
        fs.readFileSync(require.resolve(filename), 'utf-8'),
        filename,
        true
    );
    const map = component.script.map;

    const code =
        tsnode.compile(component.script.content, filename + '.ts') +
        `

(exports["default"].options || exports["default"]).template = decodeURIComponent('${encodeURIComponent(
            component.template.content
        )}');
`;

    m._compile(code, filename + '.ts');
    (m.exports.default || m.exports).options.template = component.template.content;
    return m.exports;
};

require.extensions['.scss'] = function(m, filename) {
    return {};
};

// var Module = require('module').Module;
// var modulePrototype = Module.prototype;
// var originalRequire = modulePrototype.require;
// modulePrototype.require = function(filePath) {
//     if (filePath === 'source-map-support') {
//         return { install: () => {} };
//     }

//     return originalRequire.call(this, filePath);
// };
