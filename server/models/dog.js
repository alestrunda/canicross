const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// create schema
const dogSchema = new Schema({
  id: String,
  name: String,
  age: Number,
  breed: Number,
  schedule: [String]
});

//create model
const dogModel = mongoose.model("Dog", dogSchema);

module.exports = dogModel;
