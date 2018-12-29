//load model
const WalkingSchedule = require("../models/walkingSchedule");

module.exports = {
  createRecord(req, res) {
    const newRecord = new WalkingSchedule(req.body);
    newRecord.save(err => {
      if (err) res.send(err);
    });
  },

  deleteRecordsByDog(req, res) {
    WalkingSchedule.deleteMany({ dogID: req.params.id }, err => {
      res.send(err);
    });
  },

  deleteRecord(req, res) {
    WalkingSchedule.remove({ id: req.params.id }, err => {
      res.send(err);
    });
  },

  getRecords(req, res) {
    WalkingSchedule.find({}, (err, records) => {
      res.type("json").send(records);
    });
  }
};
