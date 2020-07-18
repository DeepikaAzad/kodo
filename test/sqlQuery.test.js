const assert = require('assert');

const orderby = require("../service/sort");
const QueryBuilder = require('../service/sqlQuery');

const data = require('./__mocks__/data');

describe('Build SQL query', async() => {
	it('should return an paginate object.', async () => {
		const queryBuilder = new QueryBuilder();
		const queryParams = {
			page: 1,
			size: 10
		};
		const meta = await queryBuilder.getPaginatedPosts(queryParams);
		assert.equal(meta.count, 100)
		assert.equal(meta.currentPage, 1)
		assert.equal(meta.pageSize, 10)
		assert.equal(meta.pageCount, 10)
	})
	it('should return strict serach query', async () => {
		const queryBuilder = new QueryBuilder();
		const queryParams = {
			search: '"vitae enim"',
		};
		const meta = await queryBuilder.getPaginatedPosts(queryParams);
		assert.equal(meta.count, 1)
		assert.equal(meta.currentPage, 1)
		assert.equal(meta.pageSize, 1)
		assert.equal(meta.pageCount, 1)
	})
})
