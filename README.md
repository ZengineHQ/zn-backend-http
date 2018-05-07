# zn-backend-http

Helper library for working with znHttp in Zengine backend Plugins.

## Installation

```bash
npm install git+ssh://git@github.com/WizeHive/zn-backend-firebase --save
```

## Usage

```js
var zbh = require('zn-backend-http');

// Response success and failure handlers.
znHttp().get(path).then(zbh.formatResponse, zbh.errHandler);

// Fetch *all* records across multiple pages if available, optional filter object accepted.
zbh.fetchBatched(path, filters).then(function (results) {
   console.log(results.length);
});
```