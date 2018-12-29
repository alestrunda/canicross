const dogController = require("./controllers/dog"),
  userController = require("./controllers/user"),
  walkingScheduleController = require("./controllers/walkingSchedule");

module.exports = function(app) {
  app.get("/dogs/", dogController.getDogs);
  app.post("/dogs/", dogController.createDog);
  app.patch("/dogs/:id", dogController.editDog);
  app.delete("/dogs/:id", dogController.deleteDog);

  app.get("/users/", userController.getUsers);
  app.post("/users/", userController.createUser);
  app.patch("/users/:id", userController.editUser);
  app.post("/users/login/", userController.loginUser);

  app.get("/walking-schedule/", walkingScheduleController.getRecords);
  app.post("/walking-schedule/", walkingScheduleController.createRecord);
  app.delete("/walking-schedule/:id", walkingScheduleController.deleteRecord);
  app.delete(
    "/walking-schedule/dog/:id",
    walkingScheduleController.deleteRecordsByDog
  );
};
