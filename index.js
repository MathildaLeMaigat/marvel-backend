const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/marvel");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("OK");
  res.status(200).json({ message: "route /" });
});

const comicsRoute = require("./Routes/comics");
// app.use(comicsRoute);
const charactersRoute = require("./Routes/characters");
app.use(charactersRoute);

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found !" });
});

app.listen(process.env.PORT, () => {
  console.log("server has started 🔥");
});
