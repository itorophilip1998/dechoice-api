const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    siwes_firm_id: String,
    user_id: String, 
    url: String,
    name: String,
    location: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AppliedFirm", Schema);
