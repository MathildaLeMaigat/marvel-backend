const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
// IMPORT DB
// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI);

// IMPORT PACKAGE Password
// const uid2 = require("uid2");
// const SHA256 = require("crypto-js/sha256");
// const encBase64 = require("crypto-js/enc-base64");

// IMPORT MODELs
// const User = require("./Models/User");
// const Favorites = require("./Models/User");

// IMPORT MIDDLEWARE
// const isAuthenticated = require("./isAuthenticated");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("OK");
  res.status(200).json({ message: "route >> /" });
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&skip=${req.query.skip}&limit=${req.query.limit}&name=${req.query.search}`
    );
    console.log("route characters");
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//

app.get("/comics", async (req, res) => {
  try {
    // console.log("route comics ok");
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&skip=${req.query.skip}&limit=${req.query.limit}&title=${req.query.search}`
    );
    console.log("route comics");
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//

app.get("/comics/:id", async (req, res) => {
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

// SIGN UP
// app.post("/user/signup", async (req, res) => {
//   try {
//     // console.log(req.body);
//     const { username, email, password } = req.body;
//     const user = await User.findOne({ email: email });
//     if (username) {
//       if (user === null) {
//         //  Chaines de caracteres aleatoires
//         const token = uid2(64);
//         const salt = uid2(16);
//         // console.log(token, salt);
//         // Encryptage de mon PW concatene au Salt que j'ai generé
//         const hash = SHA256(password + salt).toString(encBase64);
//         console.log(hash);

//         const newUser = new User({
//           account: {
//             username: username,
//           },
//           email: email,
//           token: token,
//           salt: salt,
//           hash: hash,
//         });
//         await newUser.save();
//         res.json({
//           _id: newUser.id,
//           token: newUser.token,
//           account: newUser.account,
//         });
//       } else {
//         res.status(409).json({ error: "Email already used" });
//       }
//     } else {
//       res.status(400).json({ error: "Username is missing" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// LOG IN
// app.post("/user/login", async (req, res) => {
//   try {
//     // console.log(req.body);
//     const { email, password } = req.body;
//     // Verifier que l'email existe dans DB
//     const user = await User.findOne({ email: email });
//     if (user) {
//       // Verifier que le PW est le meme
//       const newHash = SHA256(password + user.salt).toString(encBase64);
//       if (newHash === user.hash) {
//         res.json({
//           _id: user.id,
//           token: user.token,
//           account: user.account,
//         });
//         // res.json("OK");
//       } else {
//         res.status(401).json({ error: "Unauthorized" });
//       }
//     } else {
//       res.status(401).json({ error: "Unauthorized" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// FAV
// app.post("/favorites", isAuthenticated, async (req, res) => {
//   try {
//     const newFavorites = new Favorites({
//       id: req.body.id,
//       name: req.body.name,
//       picture: req.body.picture,
//       owner: req.user,
//     });
//     await newFavorites.save();
//     res.json(newFavorites);
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
