const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    siwes_firm_id: String,
    user_id:String
      
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AppliedFirm", Schema);
