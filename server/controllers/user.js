const models = require('../model/user');

exports.createUser = (req, res) => {
  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.firstName,
    email: req.body.email,
    password: req.body.password
  }).then((user) => {
    res.json(user);
  }).catch((error) => {
    res.json(error);
  });
};
