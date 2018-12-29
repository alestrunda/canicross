const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  userType: Number,
  dogIDs: [String]
});

//create model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
