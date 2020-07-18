const QueryBuilder = require("../service/sqlQuery");

// Retrieve all Post from the database.
exports.getPosts = async (request, response) => {
	try {
		const queryBuilder = new QueryBuilder();
		const result = await queryBuilder.getPaginatedPosts(request.query);
		return response.send({success: true, data: result});
	} catch (error) {
		return response.status(500).send({
			success: false,
			message:
				error.message || "Some error occurred while retrieving posts."
		})
	}
};