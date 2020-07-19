const connection = require("./db.js");

class Post {

	/**
	 * @param {string} query Pass Sql query with pagination filtering and soring.
	 *
	 * @returns {object} Return the meta for pagination
	 */
	getPaginatedPost(query) {
		return new Promise((resolve, reject) => {
			try {
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
						conn.query("SELECT FOUND_ROWS() as count;", (error, totalCountQueryResponse) => {
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