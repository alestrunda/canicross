const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// create schema
const walkingScheduleSchema = new Schema({
  id: String,
  dogID: String,
  date: Number,
  timeFrom: String,
  timeTo: String,
  walkerID: String
});

//create model
const walkingScheduleModel = mongoose.model(
  "WalkingSchedule",
  walkingScheduleSchema
);

module.exports = walkingScheduleModel;
