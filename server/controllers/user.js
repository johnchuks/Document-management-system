const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');

const jwtSecret = process.env.JWT_SECRET;
const User = models.User;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  // create a user
  createUser(req, res) {
    if (!req.body.fullName) {
      return res.status(401).json({
        fullName: 'This Field is Required'
      });
    }
    if (!req.body.userName) {
      return res.status(401).json({
        userName: 'This Field is Required'
      });
    }
    if (!req.body.email) {
      return res.status(401).json({
        email: 'This Field is Required'
      });
    }
    if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({
        email: 'Email is not rightly formatted'
      });
    }
    if (!req.body.password) {
      return res.status(401).json({
        password: 'This Field is Required'
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
          console.log(userDetails);
          res.json(userDetails);
        }).catch((error) => {
          res.json(error);
        });
      }
    });
  },
  // find a user by Id
  findUser(req, res) {
    return User
      .findById(req.params.id)
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
  // update a user by Id
  updateUser(req, res) {
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
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
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
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  // log In user with JWT
  logInWithJwt(req, res) {
    if (!req.body.email) {
      return res.status(401).json({
        email: 'This field is required'
      });
    } else if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({
        email: 'Email is invalid'
      });
    } else if (!req.body.password) {
      return res.status(401).json({
        password: 'This field is required'
      });
    }
    return User
      .findAll({ where: { email: req.body.email } })
      .then((user) => {
        const existingUser = user[0];
        if (!existingUser) {
          res.json({ success: false, message: 'User Not Found' });
        } else if (existingUser) {
          if (bcrypt.compareSync(req.body.password, existingUser.password)) {
            console.log(existingUser.password, 'user');
            const payLoad = { email: existingUser.email };
            const token = jwt.sign(payLoad, jwtSecret, {
              expiresIn: 2880
            });
            res.json({
              success: true,
              message: 'Enjoy your token',
              token,
              fullName: existingUser.fullName,
              id: existingUser.id,
              email: existingUser.email,
              password: existingUser.password
            });
          } else {
            res.json({ success: false, message: 'Password Incorrect' });
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
  }
};
