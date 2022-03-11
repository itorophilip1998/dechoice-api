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

route.get("/clear-all", (req, res) => {
  User.deleteMany();
  Chat.deleteMany();
  res.send("cleared");
});
module.exports = route;
