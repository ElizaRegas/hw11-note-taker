// Dependencies
const express = require("express");
const path = require("path");

// Setting up express and port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/", "index.html"));
});

// Initiate the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});