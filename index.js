'use strict';

var znHttp = require('../../../lib/zn-http');

/**
 * Helper to format API response data.
 *
 * @param {Response} response A Node Response object.
 *
 * @return {Array<Object>} An array of  plain objects containing the results.
 */
module.exports.formatResponse = function (response) {
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

/**
 * Load an Activity by id.
 *
 * @param {number} id The activity id.
 *
 * @return {Promise<Array<Object>>}
 */
module.exports.getActivity = function (id) {
	return znHttp().get('/activities/' + id).then(module.exports.formatResponse);
};

/**
 * Load a record by id.
 *
 * @param {number} formId
 * @param {number} recordId
 *
 * @return {Promise<Object>}
 */
module.exports.getRecord = function (formId, recordId) {
	return znHttp().get('/forms/' + formId + '/records/' + recordId).then(module.exports.formatResponse);
};

/**
 * Creates a new record.
 *
 * @param {number} formId
 * @param {Object} data Record data.
 *
 * @return {Promise<Object>}
 */
module.exports.createRecord = function (formId, data) {
	return znHttp().post('/forms/' + formId + '/records', data).then(module.exports.formatResponse);
};

/**
 * Updates an existing record.
 *
 * @param {number} formId
 * @param {number} recordId
 * @param {Object} data Record data.
 *
 * @return {Promise<Object>}
 */
module.exports.updateRecord = function (formId, recordId, data) {
	return znHttp().put('/forms/' + formId + '/records/' + recordId, data).then(module.exports.formatResponse);
};

/**
 * Deletes a record.
 *
 * @param {number} formId
 * @param {number} recordId
 *
 * @return {Promise<Object>}
 */
module.exports.deleteRecord = function (formId, recordId) {
	return znHttp().del('/forms/' + formId + '/records/' + recordId).then(module.exports.formatResponse);
};

/**
 * Gets a form.
 *
 * @param {number} formId
 *
 * @return {Promise<Object>}
 */
module.exports.getForm = function (formId) {
	return znHttp().get('/forms/' + formId).then(module.exports.formatResponse);
};

/**
 * Convenience method to move a record to a given folder.
 *
 * @param {number} formId
 * @param {number} recordId
 * @param {number} folderId
 *
 * @return {Promise<Object>}
 */
module.exports.moveRecord = function (formId, recordId, folderId) {
	var data = {
		id: recordId,
		folder: {
			id: folderId
		}
	};
	return module.exports.updateRecord(formId, recordId, data);
};

/**
 *
 * @param {string} path valid Zengine API url params (ex: '/forms/123/records')
 * @param {object} params key/value pairs of query params (ex: { limit: 50, folder: 1234 })
 *
 * @returns {any[]} An array of Zengine objects
 */
module.exports.fetchBatched = (path, params = {}) => {
	/**
	 * @param {number} page
	 * @param {object[][]} results
	 * @param {number} limit this parameter is necessary to accurately maintain the limit across calls, in the event the API returns a different limit than the user defines in `params`
	 *
	 * @returns {Promise<object[]>} recursively calls API and returns all relevant data
	 */
	function getPage (page = 1, results = [], limit = params.limit || 20) {
		return znHttp().get(path, { params: { ...params, limit, page } })
			.then(res => {
				const body = res.getBody();
				const limit = body.limit;
				const total = body.totalCount;

				body.data && results.push(...body.data); // jshint ignore:line

				return total > page * limit ? getPage(page + 1, results, limit) : results;
			});
		}

	return getPage();
	};

/**
 *
 * @param {number} path
 * @param {object} params
 *
 * @returns {object[][]} An array of arrays storing the Zengine resources
 */
module.exports.fetchBatchedPaginated = (path, params = {}) => {
	/**
	 * @param {number} page
	 * @param {object[][]} pages
	 * @param {number} limit this parameter is necessary to accurately maintain the limit across calls, in the event the API returns a different limit than the user defines in `params`
	 *
	 * @returns {Promise<object[][]>} recursively calls API and returns paginated data
	 */
	function getPage (page = 1, pages = [], limit = params.limit || 20) {
		return znHttp().get(path, { params: { ...params, limit, page } })
			.then(res => {
				const body = res.getBody();
				const limit = body.limit;
				const total = body.totalCount;

				body.data && pages.push(body.data);// jshint ignore:line

				return total > page * limit ? getPage(page + 1, pages, limit) : pages;
			});
		}

	return getPage();
};
