const h = require('preact-hyperscript-h');
const render = require('preact-render-to-string');

// This will be rendered statically

module.exports = render(h.html([
  h.head([
    h.title('koa-es-modules-rollup'),
  ]),
  h.body([
    // This loads './app.js' from server as an ES6 Module bundled with all its dependencies using Rollup
    h.script({ src: 'app.js' })
  ]),
]));
