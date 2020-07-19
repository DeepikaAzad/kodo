/**
 * @function calculateLimitAndOffset
 * 
 * @param {number} currentPage Page number to get
 * @param {number} pageLimit Number of items per page/request
 *
 * @returns {object} Returns object containing limit and offset
 */
const calculateLimitAndOffset = (currentPage, pageLimit = 20) => {
	const offset = (currentPage ? Number(currentPage) - 1 : 0) * Number(pageLimit);
	const limit = Number(pageLimit);
	return { offset, limit };
}

/**
 * Builds the object pagination style response model.
 *
 * @function paginate
 *
 * @param {number} currentPage Page number to get
 * @param {number} count Total number of items
 * @param {array} rows Items
 * @param {number} pageLimit Number of items per page/request
 *
 * @returns {object} Return the meta for pagination
 */
const paginate = (currentPage, count, rows, pageLimit = 20) => {
	const meta = {
		currentPage: Number(currentPage) || 1,
		pageCount: Math.ceil(count / Number(pageLimit)),
		pageSize: rows.length,
		count
	};
	return meta;
};

/**
 * @function paginationQuery
 *
 * @param {number} currentPage Page number to get
 * @param {number} pageLimit Number of items per page/request
 */
const paginationQuery = (currentPage, pageLimit) => {
	let { offset, limit } = calculateLimitAndOffset(currentPage, pageLimit);
	return " limit " + limit + " offset " + offset;
}

module.exports = { paginationQuery, paginate, calculateLimitAndOffset }
