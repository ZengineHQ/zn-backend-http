'use strict';

const response = {
	getBody () {
		return {
			totalCount: 1,
			data: 'record'
		};
	}
};

module.exports = function () {
	const obj = {
		get: (path, options) => Promise.resolve(response),
		post: (path, data) => Promise.resolve(response),
		put: (path, data) => Promise.resolve(response),
		del: (path, data) => Promise.resolve(response),
	};

	return obj;
};
