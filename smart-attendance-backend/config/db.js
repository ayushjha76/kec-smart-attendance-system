const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ayush@1234",
  database: "smart_attendance",
});

connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
  } else {
    console.log("Database Connected");
  }
});

module.exports = connection;