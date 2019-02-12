'use strict';

var znHttp = require('../../../lib/zn-http');
var Q = require('q');

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

				Array.isArray(body.data) ? results.push(...body.data) : body.data && results.push(body.data);

				return total > page * limit ? getPage(page + 1, results, limit) : results;
			})
		}

	return getPage();
	};

	if (filter) {
		options.params.filter = JSON.stringify(filter);
	}

	var def = Q.defer();

	// Kick off the batched fetch process.
	_fetchBatched(path, options).then(function (response) {
		var promises = [];

		// We've gotta make more API calls if the total count is greater than the limit.
		if (response.count > limit) {
			// Figure out how many additional calls we need to make.
			var extraCalls = Math.ceil((response.count - limit) / limit);
			for (var i = 1; i <= extraCalls; ++i) {
				// Clone object and set new page.
				var newOptions = JSON.parse(JSON.stringify(options));
				newOptions.params.page = i + 1;
				promises.push(_fetchBatched(path, newOptions));
			}
		}

		return {
			promises: promises,
			records: response.records
		};
	}).then(function (result) {
		// Finally, execute any additional promises we may need.
		Q.all(result.promises).done(function (values) {
			values.forEach(function (val) {
				result.records = result.records.concat(val.records);
			});
			def.resolve(result.records);
		}, function (err) {
			/* istanbul ignore next LCOV_EXCL_LINE */
			def.reject(err.getBody());
		});
	}).catch(function (err) {
		def.reject(err.getBody());
	});

	return def.promise;
};

/**
 * Internal helper to fetch a batch of results.
 *
 * @param {string} path
 * @param {Object} options
 *
 * @return {Promise<Object>}
 *
 * @private
 */
function _fetchBatched (path, options) {
	return znHttp().get(path, options).then(function (response) {
		var body = response.getBody();
		/* istanbul ignore next LCOV_EXCL_LINE */
		return {
			count: body.totalCount,
			records: body.data || []
		};
	});
}
