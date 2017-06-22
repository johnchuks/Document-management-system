const models = require('../models');

const Role = models.Role;

module.exports = {
  createRole(req, res) {
    if (req.decoded.title !== 'admin' || req.decoded.id !== 1) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to create a role'
      });
    }
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
  },
  deleteRole(req, res) {
    if (req.decoded.title !== 'admin' || req.decoded.id !== 1) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized'
      });
    }
    return Role
      .destroy()
      .then(() => res.status(200).json({ message: 'Role has been deleted sucessfully' }))
      .catch(error => res.status(400).send(error));
  },
  updateRole(req, res) {
    if (req.decoded.title !== 'admin' || req.decoded.id !== 1) {
      return res.status(401).json({ message: 'You are not authorized access the role' });
    }
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(400).json({
            message: 'Role not found'
          });
        }
        return role
          .update({
            title: req.body.title || role.title
          })
          .then(() => res.status(200).send(role))
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  }
};
