const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    refresh_token: {
      type: String,
      default: null,
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
      },
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

Schema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  this.password = hash;
  next();
});

module.exports = mongoose.model("User", Schema);
