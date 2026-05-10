const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ledger: {
    type: Array,
    default: [],
  },
  goals: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("User", UserSchema);