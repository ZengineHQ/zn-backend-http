# Backend HTTP

> Helper module for working with znHttp in Zengine backend Plugins.

[![Coverage Status](https://coveralls.io/repos/github/ZengineHQ/zn-backend-http/badge.svg?branch=master)](https://coveralls.io/github/ZengineHQ/zn-backend-http?branch=master)   [![Build Status](https://circleci.com/gh/ZengineHQ/zn-backend-http/tree/master.svg?style=shield)](https://circleci.com/gh/ZengineHQ/zn-backend-http/tree/master)

## Installation

```bash
npm i @zenginehq/backend-http --save
```

## Usage


### Bulk fetching records

```js
var $api = require('@zenginehq/backend-http');

// Exmaple Response success and failure handlers.
znHttp().get(path).then($api.formatResponse, $api.errHandler);

// Fetch *all* records across multiple pages if available, optional filter object accepted.
$api.fetchBatched(path, filters).then(function (results) {
   console.log(results.length);
});
```

### Record CRUD

```js
// Load an existing record.
$api.getRecord(formId, recordId).then(function (record) {
	
});

// Update an existing record.
$api.updateRecord(formId, recordId, data);

// Delete an existing record.
$api.deleteRecord(formId, recordId);

// Create a new record.
$api.createRecord(formId, recordId, data).then(function (record) {
	
});

// Move a record to a folder.
$api.moveRecord(formId, recordId, folderId);

```

### Other convenience methods

```js
// Loads an activity by id - useful for working with webhooks.
$api.getActivity(activityId);

// Loads a form by id.
$api.getForm(formId);
```

## API Docs

[Full documentation](https://zenginehq.github.io/zn-backend-http)
