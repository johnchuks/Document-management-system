const models = require('../models/role');

exports.createRole = (req, res) => {
  models.Role
    .create({
      title: req.body.title,
    })
}
