const bcrypt = require("bcryptjs");

//load model
const User = require("../models/user");

module.exports = {
  createUser(req, res) {
    const newUser = new User(req.body);
    bcrypt.hash(newUser.password, 10).then(hash => {
      newUser.password = hash;
      newUser.save(err => {
        if (err) res.send(err);
      });
    });
  },

  editUser(req, res) {
    User.findOne({ id: req.params.id }, (err, user) => {
      if (!user) {
        res.sendStatus(404);
        return;
      }
      user.dogIDs = req.body.dogIDs;
      user.name = req.body.name;
      user.email = req.body.email;
      user.save(err => {
        if (err) res.send(err);
      });
    });
  },

  getUsers(req, res) {
    User.find({}, (err, users) => {
      res.type("json").send(
        users.map(user => {
          user.password = undefined; //do not send password, 'delete user.password' not working for some reason
          return user;
        })
      );
    });
  },

  loginUser(req, res) {
    User.findOne({ name: req.body.name }, (err, user) => {
      if (!user) {
        res.sendStatus(401);
        return;
      }
      bcrypt.compare(req.body.password, user.password).then(isCorrect => {
        if (!isCorrect) res.sendStatus(401);
        else res.send(user);
      });
    });
  }
};
