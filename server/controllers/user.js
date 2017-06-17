const jwt = require('jsonwebtoken');
const models = require('../models');

const jwtSecret = process.env.JWT_SECRET;


const User = models.User;

module.exports = {
  // create a user
  createUser(req, res) {
    User.create({
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
    return User;
  },
  // get all the users

  getUser(req, res) {
    return User
      .findAll()
      .then(user => res.status(200).send(user))
     .catch(error => res.status(400).send(error));
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
    return User
      .findAll({ where: { userName: req.body.userName } })
      .then((user) => {
        const existingUser = user[0];
        // console.log(existingUser, 'userpeople');
        if (!existingUser) {
          res.json({ success: false, message: 'User Not Found' });
        } else if (existingUser) {
          if (req.body.password !== existingUser.password) {
            console.log(existingUser.password, 'user');
            res.json({ success: false, message: 'Password Incorrect' });
          } else {
            const payLoad = { userName: existingUser.userName };
            const token = jwt.sign(payLoad, jwtSecret, {
              expiresIn: 2880
            });
            res.json({
              success: true,
              message: 'Enjoy your token',
              token
            });
          }
        }
      }).catch(error => res.status(400).send(error));
  }
  // logoutWithJwt(req, res) {
  //   delete req.body.use
  // }
};
