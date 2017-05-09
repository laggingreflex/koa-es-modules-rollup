# koa-es-modules-rollup

Koa middleware to serve ES6 Modules of requested js files on-the-fly using Rollup bundler



## Install

```sh
npm i koa-es-modules-rollup
```

## Usage

Checkout the [example](example)

### API

```
app.use(esModulesRollup(opts))
```

* **`root`** Root directly to serve and resolve JS assets from


