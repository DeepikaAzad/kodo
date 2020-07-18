const Post = require("../model/post.model");

const { paginationQuery, paginate } = require("./pagination.js");

const orderby = require("./sort.js");
const search = require("./search.js");

class QueryBuilder {

	/**
	 * Below method build mysql query for apply pagination, sorting and searching
	 * @param {object} queryParams parsed query string params passed in url
	 * @returns {string} Mysql query 
	 */
	buildQuery(queryParams) {
		try {
			let query = "SELECT SQL_CALC_FOUND_ROWS id ,name ,description ,dateLastEdited FROM post";
			const currentPage = queryParams.page || 1;
			const pageLimit = queryParams.size || 20;
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

	/**
	 * Get posts with pagination sorting and filtering.
	 * @function getPaginatedPosts
	 * @param {object} queryParams 
	 * @returns {object} post data with paaginated information. 
	 */
	async getPaginatedPosts(queryParams) {
		try {
			const currentPage = queryParams.page || 1;
			const pageLimit = queryParams.size || 20;
			const query = this.buildQuery(queryParams);
			const post = new Post();
			const result = await post.getPaginatedPosts(query);
			const data = paginate(currentPage, result.rowCount, result.rows, pageLimit);
			const rows = result.rows;
			return { ...data, rows };
		} catch (error) {
			throw error;
		}
	}
}

module.exports = QueryBuilder;