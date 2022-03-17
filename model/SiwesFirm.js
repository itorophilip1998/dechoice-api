const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    url: String,
    name: String,
    location: String,
    price: Number, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SiwesFirm", Schema);
