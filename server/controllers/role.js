const models = require('../models');

const Role = models.Role;

module.exports = {
  /**
   *
   *
   * @param {object} req - role to be created
   * @param {object} res - new created role
   * @returns {object} - newly created role
   */
  createRole(req, res) {
    if (!req.body.title) {
      return res.status(400).json({
        message: 'This field is required'
      });
    }
    if (typeof (req.body.title) !== 'string') {
      return res.status(400).json({
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
              res.status(201).send({
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
  /**
   *
   *
   * @param {void} req - no request body attached
   * @param {array} res - an array of roles and their id
   * @returns {array} array of roles
   */
  getAllRoles(req, res) {
    return Role
      .findAll()
      .then(role => res.status(200).json(role))
      .catch(error => res.json(error));
  },
  /**
   *
   *
   * @param {number} req - requested role
   * @param {object} res - role found by id
   * @returns {object} - role found by id
   */
  findRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).json({
            message: 'Role not found'
          });
        }
        res.status(200).json(role);
      }).catch(error => res.status(400).json(error));
  },
  /**
   *
   *
   * @param {number} req - role to be deleted by id
   * @param {object} res - deleted role
   * @returns {object} - message
   */
  deleteRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).json({
            message: 'Role not found'
          });
        }
        return role
            .destroy()
          .then(() => res.status(204)
            .send({ message: 'Role deleted successfully' }))
            .catch(error => res.status(400).send(error));
      }).catch(error => res.json(error));
  },
  /**
   *
   *
   * @param {number} req - requested role by id
   * @param {object} res - updated role
   * @returns {object} - updated role status
   */
  updateRole(req, res) {
    if (req.decoded.roleId !== 1) {
      return res.status(401)
        .json({ message: 'You are not authorized access the role' });
    }
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).json({
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
