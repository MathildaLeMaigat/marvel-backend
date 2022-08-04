const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    console.log("route ok");
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
