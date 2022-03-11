const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  { 
    message: {
      type: String
    },
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
  },
  {
    timestamps: true,
  }
);

 

module.exports = mongoose.model("Chat", Schema);
