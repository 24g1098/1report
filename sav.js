"use strict";

const express = require("express");
const app = express();
const port = 3000;

let memos = []; 


app.use(express.json());
app.use(express.static("public")); 


app.get("/memos", (req, res) => {
  res.json(memos);
});


app.post("/memos", (req, res) => {
  const { text } = req.body;
  if (text) {
    memos.push(text);
    res.json({ success: true, memos });
  } else {
    res.status(400).json({ success: false, message: "Invalid memo text" });
  }
});


app.post("/memos/delete", (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < memos.length) {
    memos.splice(index, 1);
    res.json({ success: true, memos });
  } else {
    res.status(400).json({ success: false, message: "Invalid index" });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
