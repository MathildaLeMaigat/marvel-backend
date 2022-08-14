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
    let limit = req.query.limit;
    let skip = limit * req.query.page;
    // let skip = (req.query.page - 1) * 100;
    // console.log("route character ok");
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&skip=${skip}&limit=${limit}`
    );
    console.log("route characters");
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    let limit = req.query.limit;
    let skip = limit * req.query.page;
    // console.log("route comics ok");
    // let skip = (req.query.page - 1) * 100;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&skip=${skip}&limit=${limit}`
    );
    console.log("route comics");
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("character/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    console.log("route 3 OK");
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// app.get("/characters/:id", async (req, res) => {
//   try {
//     const response = axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.id}?apiKey=${process.env.API_KEY}`
//     );
//     console.log("route 4 OK");
//     res.json(response.data);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found !" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server has started 🔥");
});
