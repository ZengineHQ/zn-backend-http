'use strict';

const mockery = require('mockery');

const ZN_HTTP_PATH = '../../../lib/zn-http';
let $api;

describe('api helpers', function () {

	before(function () {
		mockery.registerSubstitute(ZN_HTTP_PATH, './test/_simpleStub');
		mockery.enable({ useCleanCache: true });
		$api = require('../index')();
	});

	after(function () {
		mockery.deregisterSubstitute(ZN_HTTP_PATH);
		mockery.disable();
	});

	it('formats responses', function () {
		const response = {
			getBody () {
				return {
					totalCount: 1,
					data: 'record'
				};
			}
		};

		expect($api.formatResponse(response)).to.equal('record');
	});

	it('handles errors', function () {
		expect($api.errHandler).to.throw();
	});

	it('loads records', function () {
		return $api.getRecord(123, 456).should.be.fulfilled;
	});

	it('updates records', function () {
		return $api.updateRecord(123, 567, {}).should.be.fulfilled;
	});

	it('creates records', function () {
		return $api.createRecord(123, 567, {}).should.be.fulfilled;
	});

	it('deletes records', function () {
		return $api.deleteRecord(123, 567).should.be.fulfilled;
	});

	it('loads forms', function () {
		return $api.getForm(123).should.be.fulfilled;
	});

	it('loads activities', function () {
		return $api.getActivity(123).should.be.fulfilled;
	});

	it('moves records', function () {
		return $api.moveRecord(123, 567, 890).should.be.fulfilled;
	});
});

describe('batched helper', function () {
	before(function () {
		mockery.registerSubstitute(ZN_HTTP_PATH, './test/_complexStubMany');
		mockery.enable({ useCleanCache: true });
		$api = require('../index')();
	});

	after(function () {
		mockery.deregisterSubstitute(ZN_HTTP_PATH);
		mockery.disable();
	});

	it('fetches batched records when there are many', function () {
		return $api.fetchBatched('foo', { filter: true }).then(function (response) {
			expect(response.length).to.equal(62);
		});
	});
});

describe('batched helper continued', function () {
	before(function () {
		mockery.registerSubstitute(ZN_HTTP_PATH, './test/_complexStubFew');
		mockery.enable({ useCleanCache: true });
		$api = require('../index')();
	});

	after(function () {
		mockery.deregisterSubstitute(ZN_HTTP_PATH);
		mockery.disable();
	});

	it('fetches batched records when there are few', function () {
		return $api.fetchBatched('foo').then(function (response) {
			expect(response.length).to.equal(19);
		});
	});
});

describe('batched helper error handler', function () {

	before(function () {
		mockery.registerSubstitute(ZN_HTTP_PATH, './test/_errorStub');
		mockery.enable({ useCleanCache: true });
		$api = require('../index')();
	});

	after(function () {
		mockery.deregisterSubstitute(ZN_HTTP_PATH);
		mockery.disable();
	});

	it('throws errors when something goes wrong', function () {
		return $api.fetchBatched('foo').should.be.rejected;
	});
});

describe('batched paginated helper', function () {
	before(function () {
		mockery.registerSubstitute(ZN_HTTP_PATH, './test/_complexStubMany');
		mockery.enable({ useCleanCache: true });
		$api = require('../index')();
	});

	after(function () {
		mockery.deregisterSubstitute(ZN_HTTP_PATH);
		mockery.disable();
	});

	it('fetches batched records when there are many', function () {
		return $api.fetchBatchedPaginated('foo', { filter: true }).then(function (response) {
			expect(response.length).to.equal(4);
			expect(response.reduce((all, some) => all.concat(some), []).length).to.equal(62);
		});
	});
});

describe('batched paginated helper continued', function () {
	before(function () {
		mockery.registerSubstitute(ZN_HTTP_PATH, './test/_complexStubFew');
		mockery.enable({ useCleanCache: true });
		$api = require('../index')();
	});

	after(function () {
		mockery.deregisterSubstitute(ZN_HTTP_PATH);
		mockery.disable();
	});

	it('fetches batched records when there are few', function () {
		return $api.fetchBatchedPaginated('foo').then(function (response) {
			expect(response.length).to.equal(1);
			expect(response.reduce((all, some) => all.concat(some), []).length).to.equal(19);
		});
	});
});

describe('batched paginated helper error handler', function () {

	before(function () {
		mockery.registerSubstitute(ZN_HTTP_PATH, './test/_errorStub');
		mockery.enable({ useCleanCache: true });
		$api = require('../index')();
	});

	after(function () {
		mockery.deregisterSubstitute(ZN_HTTP_PATH);
		mockery.disable();
	});

	it('throws errors when something goes wrong', function () {
		return $api.fetchBatchedPaginated('foo').should.be.rejected;
	});
});
