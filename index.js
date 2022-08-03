const express = require("express");
const cors = require("cors");
// require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express());

// mongoose.connect(process.env.DATABASE_URL);
mongoose.connect("mongodb://localhost:27017/marvel-backend");

app.get("/", (req, res) => {
  console.log("OK");
  res.status(200).json({ message: "route /" });
});

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found !" });
});

app.listen(4000, () => {
  console.log("server has started 🔥");
});
