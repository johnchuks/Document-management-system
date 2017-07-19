const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');
const pagination = require('../helpers/helper.js');


const jwtSecret = process.env.JWT_SECRET;
const User = models.User;
const metaData = pagination.paginationMetaData;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  /**
   *
   * Create a user
   * @param {object} req - request from user
   * @param {object} res - newly created user or error
   * @returns {object} - an object of a created user and a token
   */
  createUserWithJwt(req, res) {
    if (!req.body.fullName) {
      return res.status(400).json({
        fullName: 'This Field is Required'
      });
    }
    if (!req.body.userName) {
      return res.status(400).json({
        userName: 'This Field is Required'
      });
    }
    if (!req.body.email) {
      return res.status(400).json({
        email: 'This Field is Required'
      });
    }
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        email: 'Email is not rightly formatted'
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        password: 'This Field is Required'
      });
    }
    if (req.body.roleId === 1) {
      return res.status(403).json({
        message: 'An admin role cannot be created'
      });
    }

    User.findAll({
      where: { email: req.body.email }
    }).then((err, existingUser) => {
      if (!existingUser) {
        User.provider = 'jwt';
        return User.create({
          fullName: req.body.fullName,
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          roleId: req.body.roleId || 2
        }).then((userDetails) => {
          const payload = {
            email: userDetails.email,
            fullName: userDetails.fullName,
            id: userDetails.id,
            roleId: userDetails.roleId
          };
          const token = jwt.sign(payload, jwtSecret, {
            expiresIn: 2880
          });
          res.status(201).json({
            success: true,
            token
          });
        }).catch((error) => {
          res.status(400).json(error);
        });
      }
    });
  },

  /**
   *
   * Find a user by Id
   * @param {number} req - request for user using the id of the user
   * @param {object} res - an object of the user(s) found or error
   * @returns {object} - an object of found user
   */
  findUser(req, res) {
    if (req.decoded.roleId !== 1) {
      return res.status(401).json({
        message: 'Unauthorized Access'
      });
    }
    return User
      .findAll({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ['password'] }
      })
      .then((user) => {
        if (!user.length) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   *
   *Update a user by Id
   * @param {object} req - updated user object
   * @param {object} res - updated user object or error
   * @returns {object} - return an object of the updated user
   */
  updateUser(req, res) {
    if (Number(req.decoded.id) !== Number(req.params.id)) {
      return res.status(401).json({
        message: 'You are not authorized to access this user'
      });
    }
    const queryId = Number(req.params.id);
    return User
      .findById(queryId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            fullName: req.body.fullName || user.fullName,
            userName: req.body.userName || user.userName,
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            roleId: req.body.roleId || user.roleId
          })
          .then((updatedUser) => {
            res.status(200).send({
              id: updatedUser.id,
              fullName: updatedUser.fullName,
              userName: updatedUser.userName,
              email: updatedUser.email,
              roleId: updatedUser.roleId
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   *
   * delete a user by Id
   * @param {number} req - delete user with an id
   * @param {object} res - message
   * @returns {object} - null
   */
  deleteUser(req, res) {
    if (req.decoded.roleId !== 1) {
      return res.status(401).json({
        message: 'You are not authorized to access this field'
      });
    }
    return User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).json({
          message: 'User has been deleted successfully' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  /**
   *
   *log In user with JWT
   * @param {object} req - request from log in user
   * @param {object} res - authenicated user details
   * @returns {object} - an object of the logged in user and a token
   */
  logInWithJwt(req, res) {
    if (!req.body.email) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    } else if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        email: 'Email is invalid'
      });
    } else if (!req.body.password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }
    return User
      .findAll({ where: { email: req.body.email } })
      .then((user) => {
        const existingUser = user[0];
        if (!existingUser) {
          res.status(400).json({
            message: 'Invalid User Credentials' });
        } else if (existingUser) {
          if (bcrypt.compareSync(req.body.password, existingUser.password)) {
            const payLoad = (
              {
                email: existingUser.email,
                id: existingUser.id,
                fullName: existingUser.fullName,
                roleId: existingUser.roleId,
              }
            );
            const token = jwt.sign(payLoad, jwtSecret, {
              expiresIn: 60 * 60 * 24
            });
            res.status(201).json({
              success: true,
              token,
            });
          } else {
            res.status(401).json({
              success: false,
              password: 'Password is Invalid'
            });
          }
        }
      }).catch(error => res.status(400).send(error));
  },

  /**
   * get all users
   *
   * @param {number} req - limit and offset for getting all user
   * @param {array} res - array of users or error
   * @returns {array} - an array of users
   */
  getAllUsers(req, res) {
    const limit = req.query.limit;
    const offset = req.query.offset;
    return User
    .findAndCountAll(
      { limit,
        offset,
        attributes: { exclude: ['password'] }
      })
    .then(({ rows: user, count }) => {
      res.status(200).send({
        user,
        pagination: metaData(count, limit, offset)
      });
    })
    .catch(error => res.status(400).send(error));
  },

  /**
   *Log the user out
   *
   * @param {string} req - null
   * @param {object} res - message of sucessfully loggint out
   * @return {object} - message
   */
  logOutUser(req, res) {
    res.status(200).json({
      message: 'You have logged out successfully'
    });
  },
  /**
   *search for user using a query string
   *
   * @param {string} req - search query as a string
   * @param {array} res - array of users
   * @returns {array} - array users searched
   */
  searchUser(req, res) {
    const searchQuery = req.query.q,
      limit = req.query.limit,
      offset = req.query.offset;
    if (!searchQuery) {
      return res.status(400).json({
        message: 'Invalid search input'
      });
    }
    return User
    .findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['password'] },
      where: {
        fullName: {
          $like: `%${searchQuery}%`,
        }
      }
    }).then(({ rows: user, count }) => {
      if (count === 0) {
        return res.status(400).json({
          message: 'User not found'
        });
      }
      res.status(200).send({
        user,
        pagination: metaData(count, limit, offset)
      });
    }).catch(error => res.status(400).send(error));
  }
};
