// const mysql = require("mysql");
const Mysql = require("sync-mysql");
const dbConfig = require("../config/db.config");

// Create a connection to the database
//const connection = mysql.createConnection({
const connection = new Mysql({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: dbConfig.MULTIPLESTATEMENT,
  port: dbConfig.PORT,
});
console.log("Successfully connected to the database!");

// // open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

module.exports = connection;
