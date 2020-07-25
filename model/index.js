const connection = require("./db");
const fs = require("fs");

exports.migrateDatabase = async () => {
	return new Promise((resolve, reject) => {
		try {
			// Data migration script 
			connection.getConnection((error, conn) => {
				if (error) {
					console.log(error);
					throw error;
				}

				conn.query("SELECT id FROM post;", (error, data) => {
					if (error) {
						conn.release();
						throw error;
					}
					if (data.length != 100) {
						conn.query('DELETE FROM post;', function (err, result) {
							if (err) {
								conn.release();
								console.log('Data deletion fails.');
								throw error;
							}
							console.log('Data deleted successfully.');
						});

						const jsonData = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf-8'));
						const mockData = jsonData.map(Object.values);
						
						conn.query('INSERT INTO post (name, image, description, dateLastEdited) VALUES ?', [mockData], function (err, result) {
							if (err) {
								conn.release();
								console.log('Data insertion fails.');
								throw error;
							}
							console.log('Data inserted successfully.');
							return resolve(result);
						});
					}
				});
			});
		} catch (error) {
			return reject(error);
		}
	});
}