const Post = require("../model/post.model");

const { paginationQuery, paginate } = require("./pagination.js");

const orderby = require("./sort.js");
const search = require("./search.js");

class QueryBuilder {

	/**
	 * Get posts with pagination sorting and filtering.
	 *
	 * @function getPaginatedPost
	 *
	 * @param {object} queryParams 
	 *
	 * @returns {object} post data with paaginated information. 
	 */
	async getPaginatedPost(queryParams) {
		try {
			const currentPage = queryParams.page || 1;
			const pageLimit = queryParams.size || 20;
			const query = this.buildQuery(queryParams, currentPage, pageLimit);
			const post = new Post();
			const result = await post.getPaginatedPost(query);
			const data = paginate(currentPage, result.rowCount, result.rows, pageLimit);
			const rows = result.rows;
			return { ...data, rows };
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Below method build mysql query for apply pagination, sorting and searching
	 * @function buildQuery
	 *
	 * @param {object} queryParams Parsed query string params passed in url
	 * @param {number} currentPage Page number to get
	 * @param {number} pageLimit Number of items per page/request
	 *
	 * @returns {string} Mysql query 
	 */
	buildQuery(queryParams, currentPage, pageLimit) {
		try {
			let query = "SELECT SQL_CALC_FOUND_ROWS id ,name ,description ,dateLastEdited FROM post";
			// Searching
			if (queryParams.search !== undefined) {
				const searchQuery = search(queryParams.search);
				query += searchQuery;
			}

			// Order by/ sorting
			if (queryParams.sort !== undefined) {
				query += orderby(queryParams.sort);
			}

			// Pagination
			if (queryParams.page !== undefined) {
				query += paginationQuery(currentPage, pageLimit);
			}
			return query;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = QueryBuilder;