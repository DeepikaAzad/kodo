/**
 * @param {string} str search term
 * @returns {string} returns string of where clause of mysql.
 */
const search = (str) => {
	return "  where MATCH(name, description) AGAINST('"+ str +"' IN BOOLEAN MODE) ";
}

module.exports = search;
