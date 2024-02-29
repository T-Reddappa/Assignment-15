const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: String,
    address: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    nickname: String,
  },
  {
    timeStamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
