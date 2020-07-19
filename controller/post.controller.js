const QueryBuilder = require("../service/queryBuilder");

// Retrieve all Post from the database.
exports.getPost = async (request, response) => {
	try {
		const queryBuilder = new QueryBuilder();
		const result = await queryBuilder.getPaginatedPost(request.query);
		return response.send({success: true, data: result});
	} catch (error) {
		return response.status(500).send({
			success: false,
			message:
				error.message || "Some error occurred while retrieving posts."
		})
	}
};