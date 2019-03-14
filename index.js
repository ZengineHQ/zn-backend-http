'use strict';

/** @class
* @param {znHttp} znHttp A ZnHttp reference
*/
function BackendFactory(znHttp) {

	if (!znHttp) {
		znHttp = require('../../../lib/zn-http')();
	}

	let self = {};

	/**
	 * @function formatResponse
	 * @memberof BackendFactory
	 * @description Helper to format API response data.
	 *
	 * @param {Response} response A Node Response object.
	 *
	 * @return {Array<Object>} An array of  plain objects containing the results.
	 */
	self.formatResponse = response => {
		return response.getBody().data;
	};

	/**
	 * @function errHandler
	 * @memberof BackendFactory
	 * @description Helper to handle API errors.
	 *
	 * @param {Response} err A Node Response object.
	 */
	self.errHandler = err => {
		// @TODO whether to throw an actual error is tentative.
		throw new Error(err.getBody());
	};

	/**
	 * @function getActivity
	 * @memberof BackendFactory
	 * @description Load an Activity by id.
	 *
	 * @param {number} id The activity id.
	 *
	 * @return {Promise<Array<Object>>}
	 */
	self.getActivity = id => {
		return znHttp.get('/activities/' + id).then(self.formatResponse);
	};

	/**
	 * @function getRecord
	 * @memberof BackendFactory
	 * @description Load a record by id.
	 *
	 * @param {number} formId
	 * @param {number} recordId
	 *
	 * @return {Promise<Object>}
	 */
	self.getRecord = (formId, recordId) => {
		return znHttp.get('/forms/' + formId + '/records/' + recordId).then(self.formatResponse);
	};

	/**
	 * @function createRecord
	 * @memberof BackendFactory
	 * @description Creates a new record.
	 *
	 * @param {number} formId
	 * @param {Object} data Record data.
	 *
	 * @return {Promise<Object>}
	 */
	self.createRecord = (formId, data) => {
		return znHttp.post('/forms/' + formId + '/records', data).then(self.formatResponse);
	};

	/**
	 * @function updateRecord
	 * @memberof BackendFactory
	 * @description Updates an existing record.
	 *
	 * @param {number} formId
	 * @param {number} recordId
	 * @param {Object} data Record data.
	 *
	 * @return {Promise<Object>}
	 */
	self.updateRecord = (formId, recordId, data) => {
		return znHttp.put('/forms/' + formId + '/records/' + recordId, data).then(self.formatResponse);
	};

	/**
	 * @function deleteRecord
	 * @memberof BackendFactory
	 * @description Deletes a record.
	 *
	 * @param {number} formId
	 * @param {number} recordId
	 *
	 * @return {Promise<Object>}
	 */
	self.deleteRecord = (formId, recordId) => {
		return znHttp.del('/forms/' + formId + '/records/' + recordId).then(self.formatResponse);
	};

	/**
	 * @function getForm
	 * @memberof BackendFactory
	 * @description Gets a form.
	 *
	 * @param {number} formId
	 *
	 * @return {Promise<Object>}
	 */
	self.getForm = formId => {
		return znHttp.get('/forms/' + formId).then(self.formatResponse);
	};

	/**
	 * @function moveRecord
	 * @memberof BackendFactory
	 * @description Convenience method to move a record to a given folder.
	 *
	 * @param {number} formId
	 * @param {number} recordId
	 * @param {number} folderId
	 *
	 * @return {Promise<Object>}
	 */
	self.moveRecord = (formId, recordId, folderId) => {
		var data = {
			id: recordId,
			folder: {
				id: folderId
			}
		};
		return self.updateRecord(formId, recordId, data);
	};

	/**
	 * @function fetchBatched
	 * @memberof BackendFactory
	 * @description fetch all for given resource
	 *
	 * @param {string} path valid Zengine API url params (ex: '/forms/123/records')
	 * @param {object} params key/value pairs of query params (ex: { limit: 50, folder: 1234 })
	 *
	 * @returns {any[]} An array of Zengine objects
	 */
	self.fetchBatched = (path, params = {}) => {
		/**
		 * @param {number} page
		 * @param {object[]} results
		 * @param {number} limit this parameter is necessary to accurately maintain the limit across calls, in the event the API returns a different limit than the user defines in `params`
		 *
		 * @returns {Promise<object[]>} recursively calls API and returns all relevant data
		 */
		function getPage (page = 1, results = [], limit = params.limit || 20) {
			return znHttp.get(path, { params: { ...params, limit, page } })
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
	 * @function fetchBatchedPaginated
	 * @memberof BackendFactory
	 * @description fetch all for a given resource, chunked by page
	 *
	 * @param {number} path
	 * @param {object} params
	 *
	 * @returns {object[][]} An array of arrays storing the Zengine resources
	 */
	self.fetchBatchedPaginated = (path, params = {}) => {
		/**
		 * @param {number} page
		 * @param {object[][]} pages
		 * @param {number} limit this parameter is necessary to accurately maintain the limit across calls, in the event the API returns a different limit than the user defines in `params`
		 *
		 * @returns {Promise<object[][]>} recursively calls API and returns paginated data
		 */
		function getPage (page = 1, pages = [], limit = params.limit || 20) {
			return znHttp.get(path, { params: { ...params, limit, page } })
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

	return self;

}

module.exports = BackendFactory;

