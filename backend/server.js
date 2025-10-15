// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let items = [];
let idCounter = 1;

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const { title } = req.body;
  const item = { id: idCounter++, title: title || "Untitled" };
  items.push(item);
  res.status(201).json(item);
});

app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  items[idx].title = title;
  res.json(items[idx]);
});

app.delete("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  items = items.filter(i => i.id !== id);
  res.json({ success: true });
});

const port = 4000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
