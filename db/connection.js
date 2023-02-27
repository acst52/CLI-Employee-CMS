// Import dotenv pkg to protect MySQL connection details:
require('dotenv').config();

// Import mySQL2:
const mysql = require('mysql2');

// Create connection object to be exported:
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Export mySQL connection:
module.exports = connection;
