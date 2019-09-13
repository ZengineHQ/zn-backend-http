# Backend HTTP

> Helper module for working with znHttp in Zengine backend Plugins.

[![Coverage Status](https://coveralls.io/repos/github/ZengineHQ/zn-backend-http/badge.svg?branch=master)](https://coveralls.io/github/ZengineHQ/zn-backend-http?branch=master)   [![Build Status](https://circleci.com/gh/ZengineHQ/zn-backend-http/tree/master.svg?style=shield)](https://circleci.com/gh/ZengineHQ/zn-backend-http/tree/master) [![npm version](https://badge.fury.io/js/%40zenginehq%2Fbackend-http.svg)](https://badge.fury.io/js/%40zenginehq%2Fbackend-http)

## Installation

```bash
npm i @zenginehq/backend-http
```

## Usage


### Bulk fetching records

```js
var $api = require('@zenginehq/backend-http')();

// Example Response success and failure handlers.
znHttp().get(path)
  .then($api.formatResponse)
  .then(data => {
    // data will be the Zengine object(s) you requested without all the metadata distractions
  })
  .catch($api.errHandler);

// Fetch *all* records across multiple pages if available, with any special parameters included in the second arg.
$api.fetchBatched(path, { limit: 100, 'not-field123': 'some value' })
  .then(results => {
    console.log(results.length);
  });
```

### Record CRUD

```js
// Load an existing record.
$api.getRecord(formId, recordId).then(record => {
	// do something with `record`
});

// Update an existing record.
// data should be a single object.
// options should be a single object and can include specific headers and a specific amount of retry attempts.
// delay should be provided in milliseconds.
// options and delay are optional.
$api.updateRecord(formId, recordId, data, options, delay);

// Delete an existing record.
$api.deleteRecord(formId, recordId);

// Create a new record. data can be an array of objects or a single object
$api.createRecord(formId, data).then(recordId => {
  // the record ID(s) from the successful create (or update) operation.
  // Important: it will always be the ID(s), not the entire record(s)
});

// Move a record to a folder.
$api.moveRecord(formId, recordId, folderId);

```

**Special Note**
To update multiple records on the same form, use the `createRecord` method and include the IDs of each object to ensure they are updated, rather than having new records created.

### Other convenience methods

```js
// Loads an activity by id, useful for working with webhooks.
const activity = await $api.getActivity(activityId);

// Loads a form by id.
const form = await $api.getForm(formId);
```

## API Docs

[Full documentation](https://zenginehq.github.io/zn-backend-http)
