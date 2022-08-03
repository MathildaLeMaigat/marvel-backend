const express = require("express");
const router = express.Router();

router.get("/characters", async (req, res) => {
  try {
    console.log("route ok");
    // const charactersList = await axios.get(
    //   "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=sJtB4rOXTaqEL0PO"
    // );
    // res.json(charactersList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.export = router;
