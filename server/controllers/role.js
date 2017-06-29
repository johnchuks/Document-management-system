const models = require('../models');

const Role = models.Role;

module.exports = {
  createRole(req, res) {
    if (!req.body.title) {
      return res.status(401).json({
        message: 'This field is required'
      });
    }
    if (typeof (req.body.title) !== 'string') {
      return res.status(403).json({
        message: 'Invalid input credentials'
      });
    }
    Role.findAll({ where: { title: req.body.title } })
      .then((existingRole) => {
        if (!existingRole) {
          return Role
            .create({
              title: req.body.title
            }).then((role) => {
              res.send({
                message: 'Role successfully created',
                role
              });
            })
            .catch((error) => {
              res.json(error);
            });
        }
      }).catch(error => res.json(error));
  },
  getAllRoles(req, res) {
    return Role
      .findAll()
      .then(role => res.status(200).json(role))
      .catch(error => res.json(error));
  },
  findRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(400).json({
            message: 'Role not found'
          });
        } else {
          res.status(200).json(role);
        }
      }).catch(error => res.status(400).json(error));
  },
  deleteRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(400).json({
            message: 'Role not found'
          });
        }
        return role
            .destroy()
            .then(() => res.status(200).json({ message: 'Role has been deleted successfully' }))
            .catch(error => res.status(400).send(error));
      }).catch(error => res.json(error));
  },
  updateRole(req, res) {
    if (req.decoded.roleId !== 1) {
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
          .then(() => res.status(200).json({
            message: 'Role updated successfully',
            role
          }))
          .catch(error => res.status(400).json(error));
      }).catch(error => res.status(400).json(error));
  }
};
