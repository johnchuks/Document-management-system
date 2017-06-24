const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');

const jwtSecret = process.env.JWT_SECRET;
const User = models.User;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  // create a user
  createUserWithJwt(req, res) {
    if (!req.body.fullName) {
      return res.status(401).json({
        message: 'This Field is Required'
      });
    }
    if (!req.body.userName) {
      return res.status(401).json({
        message: 'This Field is Required'
      });
    }
    if (!req.body.email) {
      return res.status(401).json({
        message: 'This Field is Required'
      });
    }
    if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({
        email: 'Email is not rightly formatted'
      });
    }
    if (!req.body.password) {
      return res.status(401).json({
        message: 'This Field is Required'
      });
    }
    if (req.body.roleId === 1) {
      return res.status(403).json({
        message: 'An admin role cannot be created'
      });
    }

    User.findAll({
      where: { email: req.body.email, userName: req.body.userName } // big edge case to fix for username
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
          res.status(200).json({
            success: true,
            message: 'Enjoy your token',
            token
          });
        }).catch((error) => {
          res.status(401).json(error);
        });
      }
    });
  },
  // find a user by Id
  findUser(req, res) {
    if (req.decoded.roleId !== 1) {
      return res.status(401).json({
        message: 'Unauthorized Access'
      });
    }
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: 'User not found'
          });
        } else {
          res.status(200).send(user);
        }
      })
      .catch(error => res.status(400).send(error));
  },
  // update a user by Id
  updateUser(req, res) {
    console.log('decoded', req.decoded.id);
    if (Number(req.decoded.id) !== Number(req.params.id)) {
      return res.status(403).json({
        message: 'You are not authorized to access this user'
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
          .update({
            fullName: req.body.fullName || user.fullName,
            userName: req.body.userName || user.userName,
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            roleId: req.body.roleId || user.roleId
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  // delete a user by Id
  deleteUser(req, res) {
    if (req.decoded.roleId !== 1) {
      return res.status(403).json({
        message: 'You are not authorized to access this field'
      });
    }
    return User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).json({ message: 'User has been deleted successfully' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  // log In user with JWT
  logInWithJwt(req, res) {
    if (!req.body.email) {
      return res.status(401).json({
        message: 'This field is required'
      });
    } else if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({
        email: 'Email is invalid'
      });
    } else if (!req.body.password) {
      return res.status(401).json({
        message: 'This field is required'
      });
    }
    return User
      .findAll({ where: { email: req.body.email } })
      .then((user) => {
        const existingUser = user[0];
        if (!existingUser) {
          res.status(401).json({ success: false, message: 'Invalid User Credentials' });
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
            res.status(200).json({
              success: true,
              message: 'Enjoy your token',
              token,
              existingUser
            });
          } else {
            res.status(401).json({ success: false, password: 'Password is Invalid' });
          }
        }
      }).catch(error => res.status(400).send(error));
  },
  // get all users
  getAllUsers(req, res) {
    const limit = req.query.limit;
    const offset = req.query.offset;
    return User
    .findAndCountAll({ limit, offset })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
  },
  // log the user out
  logOutUser(req, res) {
    res.status(200).json({
      message: 'You have logged out successfully'
    });
  }
};
