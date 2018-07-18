'use strict';

const snapshot = {
	val () {
		return 'data from firebase';
	}
};

module.exports = function () {
	const obj = {
		child: (path) => {
			obj.path = path;
			return obj;
		},
		once: (s, cb, err) => {
			return !obj.path ? err() : cb(snapshot)
		},
		update: (d, cb) => cb(!d),
		path: ''
	};

	return obj;
};
