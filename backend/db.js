const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",       // XAMPP default
  password: "",       // XAMPP default
  database: "task_tracker"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = connection;
