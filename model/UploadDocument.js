const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    department: String,
    school: String,
    firm_type: String,
    duration: String,
    user_id: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Upload", Schema);
