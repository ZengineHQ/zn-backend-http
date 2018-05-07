'use strict';

var znHttp = require('../../lib/zn-http');
var Q = require('q');

/**
 * Helper to format API response data.
 *
 * @param {Response} response A Node Response object.
 *
 * @return {Array<Object>} An array of  plain objects containing the results.
 */
module.exports.formatResponseData = function (response) {
    return response.getBody().data;
};

/**
 * Helper to handle API errors.
 *
 * @param {Response} err A Node Response object.
 */
module.exports.errHandler = function (err) {
    // @TODO whether to throw an actual error is tentative.
    throw new Error(err.getBody());
};