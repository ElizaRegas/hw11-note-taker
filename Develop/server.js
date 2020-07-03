// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");

// Setting up express and port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML route
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/", "notes.html"));
});

// Api routes
app.get("/api/notes", (req, res) => {
  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
});


app.post("/api/notes", (req, res) => {
  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    
    const jsonData = JSON.parse(data);
    const newNote = req.body;
    jsonData.push(newNote);    
    // return res.json(data);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(jsonData), (err, data) => {
      if (err) throw err;
      console.log("File write succeeded");
      res.json(jsonData);
    })
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/", "index.html"));
});

// Initiate the server
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});