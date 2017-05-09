import h from 'preact-hyperscript-h';
import { render, Component } from 'preact';

// This will be rendered dynamically on client

class App extends Component {
  render() {
    return h.div([
      h.h1('koa-es-modules-rollup'),
      h.p('Hello world!'),
    ]);
  }
}

render(h(App), document.body);
