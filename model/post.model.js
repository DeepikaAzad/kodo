const connection = require("./db.js");

class Post {

	/**
	 * @param {string} query Pass Sql query with pagination filtering and soring.
	 * @returns {object} return the meta for pagination
	 */
	getPaginatedPosts(query) {
		return new Promise((resolve, reject) => {
			try {
				const totalCountQuery = "SELECT FOUND_ROWS() as count;";
				connection.getConnection((error, conn) => {
					if (error) {
						throw error;
					}
					conn.query(query, (error, result) => {
						if (error) {
							conn.release();
							throw error;
						}

						const rows = result;
						conn.query(totalCountQuery, (error, totalCountQueryResponse) => {
							if (error) {
								conn.release();
								throw error;
							}
							const rowCount = totalCountQueryResponse[0].count;
							conn.release();
							return resolve({
								rows: rows,
								rowCount: rowCount
							});
						});
					});
				});
			} catch (error) {
				return reject(error);
			}
		});
	}
}

module.exports = Post;