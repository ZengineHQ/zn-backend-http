'use strict';

const response = {
	getBody () {
		return 'error message';
	}
};

module.exports = function () {
	const obj = {
		get: (path, options) => Promise.reject(response),
	};

	return obj;
};
