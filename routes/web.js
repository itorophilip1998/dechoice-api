const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  const data = { name: "itoro", gender: "male" };
  res.render("home", { data });
});
module.exports = route;
