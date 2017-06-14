const models = require('../models');

const Role = models.Role;

module.exports = {
  createRole(req, res) {
    return Role
      .create({
        title: req.body.title
      }).then(role => res.json(role))
      .catch(error => res.json(error));
  },
  getRole(req, res) {
    return Role
      .findAll()
      .then(role => res.json(role))
      .catch(role => res.json(role));
  }
};
