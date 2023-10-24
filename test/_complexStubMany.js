'use strict';

let counter = 1;
const totalCount = 62;
const limit = 20;

const response = {
	getBody () {
		const data = [];
		const target = counter + 20;

		for (; counter < target && counter <= totalCount; ++counter) {
			data.push(counter);
		}

		return { totalCount, data, limit };
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
