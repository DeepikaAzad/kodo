const mysql = require("mysql");
const fs = require('fs');

const connection = mysql.createPool({
	host: process.env.HOST,
	user: process.env.DB_USER,
	password: process.env.PASSWORD,
	database: process.env.DB
});

module.exports = connection;
