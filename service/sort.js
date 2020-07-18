/**
 * @param {string} orderby column name with - to order by descending order
 * @returns {string} returns mysql query of order by
 */
const orderby = (str) => {
	const sortColumns = str.split(",");
	let query = " order by ";
	for (let i = 0; i < sortColumns.length; i++) {
		let sortColumn = sortColumns[i];
		let isDescOrder = sortColumn.includes('-');
		let order = isDescOrder ? "DESC" : "ASC";
		let column = isDescOrder ? sortColumn.split("-")[1] : sortColumn.split("-")[0];
		if (column !== undefined) {
			query += column + " " + order;

			if (sortColumns.length > 1 && i < (sortColumns.length - 1)) {
				query += ", ";
			} else {
				query += " ";
			}
		}
	}
	return query;
}

module.exports = orderby;
