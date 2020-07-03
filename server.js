// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Setting up express and port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Notes.html route
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/", "notes.html"));
});

// Getting the json data
app.get("/api/notes", (req, res) => {
  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

// Adding a new note to the json data
app.post("/api/notes", (req, res) => {
  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    
    const jsonData = JSON.parse(data);
    const idArr = jsonData.map(note => note.id);
    const highestId = Math.max(...idArr);
    const newNote = req.body;
    newNote.id = highestId + 1;
    jsonData.push(newNote);    

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(jsonData), (err, data) => {
      if (err) throw err;
      res.json(jsonData);
    })
  });
});

// Deleting a note from the json data
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    
    const jsonData = JSON.parse(data);
    const results = jsonData.filter(note => note.id !== parseInt(noteId));

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(results), (err, data) => {
      if (err) throw err;
      res.json(results);
    });
  });
});

// Index.html route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/", "index.html"));
});

// Initiate the server
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});