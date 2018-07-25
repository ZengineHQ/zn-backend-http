'use strict';

let counter = 1;
const totalCount = 19;

const response = {
	getBody () {
		const data = [];
		const target = counter + 20;

		for (; (counter < target && counter <= totalCount); ++counter) {
			data.push(counter);
		}

		return { totalCount, data };
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
