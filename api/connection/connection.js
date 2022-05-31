const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hischool_xd",
  // port: ''
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Error de db: ", err);
  } else {
    console.log("Conexion OK");
  }
});

module.exports = mysqlConnection;
