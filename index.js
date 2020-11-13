const express = require("express");
const db = require("./config/db");
const cors = require("cors");
var app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/api/create", (req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const text = req.body.text;

  console.log(username + title + text);
  db.query(
    "INSERT INTO posts (title,post_text,user_name) VALUES (?,?,?)",
    [title, text, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
