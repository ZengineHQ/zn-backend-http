'use strict';

const mockery = require('mockery');
let $api;

describe('module', function () {

	before(function () {
		mockery.enable();
		$api = require('../index');
	});

	after(function () {
		mockery.disable();
	});

	// it('should expand firebase paths', function () {
	// 	expect($api.expandPath('foo').path).to.equal('foo');
	// 	expect($api.expandPath('foo/bar/baz').path).to.equal('foo/bar/baz');
	// 	expect($api.expandPath(['foo']).path).to.equal('foo');
	// 	expect($api.expandPath(['foo', 'bar', 'baz']).path).to.equal('foo/bar/baz');
	// });
});
