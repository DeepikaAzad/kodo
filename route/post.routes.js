module.exports = app => {
	const post = require("../controller/post.controller.js");
	// Create a new Customer
	app.get("/post", post.getPosts);
};
