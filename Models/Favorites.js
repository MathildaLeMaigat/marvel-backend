const mongoose = require("mongoose");

const Favorites = mongoose.model("Favorites", {
  id: String,
  name: String,
  picture: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorites;
