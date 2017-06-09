const models = require('../models');

const User = models.User;

module.exports = {
  createUser(req, res) {
    return User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId

    }).then((user) => {
      res.json(user);
    }).catch((error) => {
      res.json(error);
    });
  },
  getUser(req, res) {
    return User
      .findAll()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
      // .findAndCountAll()
      // .then((users) => {
      //   console.log(users);
      // });
  },
};
