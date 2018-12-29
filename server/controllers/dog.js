//load model
const Dog = require("../models/dog");

module.exports = {
  createDog(req, res) {
    const newDog = new Dog(req.body);
    newDog.save(err => {
      if (err) res.send(err);
    });
  },

  deleteDog(req, res) {
    Dog.remove({ id: req.params.id }, err => {
      res.send(err);
    });
  },

  editDog(req, res) {
    Dog.findOne({ id: req.params.id }, (err, dog) => {
      dog.name = req.body.name;
      dog.age = req.body.age;
      dog.breed = req.body.breed;
      dog.schedule = req.body.schedule.map(record => JSON.stringify(record)); //save record object as string
      dog.save(err => {
        if (err) res.send(err);
      });
    });
  },

  getDogs(req, res) {
    Dog.find({}, (err, results) => {
      const dogs = results.map(dog => {
        //re-create schedule record object that was saved as string
        const schedule = dog.schedule.map(record => JSON.parse(record));
        const { id, name, age, breed } = dog;
        return {
          id,
          name,
          age,
          breed,
          schedule
        };
      });
      res.type("json").send(dogs);
    });
  }
};
