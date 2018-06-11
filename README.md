# Backend HTTP

> Helper module for working with znHttp in Zengine backend Plugins.

## Installation

```bash
npm i @zenginehq/backend-http --save
```

## Usage

```js
var zbh = require('@zenginehq/backend-http');

// Response success and failure handlers.
znHttp().get(path).then(zbh.formatResponse, zbh.errHandler);

// Fetch *all* records across multiple pages if available, optional filter object accepted.
zbh.fetchBatched(path, filters).then(function (results) {
   console.log(results.length);
});
```
