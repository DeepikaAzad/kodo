const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

// Initial database migration.
const db = require("./model/index.js");
db.migrateDatabase();

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
	res.json({ message: "Service is running....." });
});

require("./route/post.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
