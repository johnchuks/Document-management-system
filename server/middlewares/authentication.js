const jwt = require('jsonwebtoken'),
  secret = process.env.JWT_SECRET;
const models = require('../models/');

module.exports = {

  verifyJwtToken(req, res, next) {
    const token = req.headers.Authorization || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.json({ success: false, message: 'Token authentication failed' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  },

  adminAccess(req, res, next) {
    models.Role.findById(req.decoded.id).then((role) => {
      if (role.id === 1 || role.title === 'admin') {
        next();
      }
      return res.status(403).json({
        message: 'You are not authorized'
      });
    });
  }
};
