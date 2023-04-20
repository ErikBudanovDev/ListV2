import connection from "./databaseSQL.js";

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as ID", connection.threadId);
});

connection.query("SELECT * FROM apartmentIDs", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
  connection.end((err) => {
    if (err) {
      console.error("Error ending the connection:", err.stack);
      return;
    }
    console.log("Connection closed");
  });
});
