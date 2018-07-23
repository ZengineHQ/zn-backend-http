'use strict';

const response = {
	getBody () {
		const data = [];

		for (let i = 1; i <= 62; ++i) {
			data.push(i);
		}

		return {
			totalCount: data.length,
			data
		};
	}
};

module.exports = function () {
	const obj = {
		get: (path, options) => {
			return Promise.resolve(response);
		}
	};

	return obj;
};
