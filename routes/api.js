const express = require("express");
const {
  signin,
  signup,
  signout,
  me,
  token,
} = require("../controllers/UserController");
const {
  postChat,
  deletChat,
  getChat,
} = require("../controllers/ChatController");
const { authenticateToken } = require("../middleware/auth");
const User = require("../model/User");
const Chat = require("../model/Chat");
const { json } = require("body-parser");
const route = express.Router();

route // Auth Group
  .post("/signup", signup)
  .post("/signin", signin)
  .delete("/signout", authenticateToken, signout)
  .get("/me", authenticateToken, me)
  .post("/refresh-token", token)
  .get("/", (req, res) => res.send("Api"));

route // Chat Group
  .post("/chat", authenticateToken, postChat)
  .delete("/chat/:id", authenticateToken, deletChat)
  .get("/chat", authenticateToken, getChat);

route.get("/clear-all", authenticateToken, async (req, res) => {
  try {
    if (req && req.user.username === "Itoro") {
      await User.deleteMany();
      await Chat.deleteMany();
      res.json({ msg: "cleared", username: req.user.username });
    } else res.status(400).json({ msg: "Not Authorized" });
  } catch (err) {
    res.status(402).json({ err, msg: "Ops and error accured" });
  }
});
module.exports = route;
