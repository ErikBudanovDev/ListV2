import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "listam",
  password: "moonax1993",
});

export default connection;
