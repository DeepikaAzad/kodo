const assert = require('assert');
const data = require('./__mocks__/data');
const orderby = require("../service/sort");

describe('Sorting', () => {
	it('should return ascending order sql query', done => {
		const query = orderby("name");
		assert.equal(query, " order by name ASC ");
		done();
	})
	it('should return descending order sql query', done => {
		const query = orderby("-dateLastEdited");
		assert.equal(query, " order by dateLastEdited DESC ");
		done();
	})
})
