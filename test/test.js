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

	it('fetches batched records', function () {
		
	});
});
