const express = require("express");
const router = express.Router();

router.get("/comics", (req, res) => {
  try {
    console.log("ok");
    res.json({ message: "page comics" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
