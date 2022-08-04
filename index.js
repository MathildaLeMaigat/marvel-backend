const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/marvel");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("OK");
  res.status(200).json({ message: "route >> /" });
});

app.get("/characters", async (req, res) => {
  try {
    console.log("route ok");
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
    );
    console.log("route characters");
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    console.log("ok");
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=sJtB4rOXTaqEL0PO`
      //   `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    console.log("route comics");
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found !" });
});

app.listen(process.env.PORT, () => {
  console.log("server has started 🔥");
});
