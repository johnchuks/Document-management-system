const jwt = require('jsonwebtoken'),
  secret = process.env.JWT_SECRET;
const models = require('../models/');

module.exports = {

  verifyJwtToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.json({ success: false, error });
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
    if (req.decoded.roleId === 1) {
      next();
    } else {
      return res.status(403).json({
        message: 'You are not authorized',
      });
    }
  }
};
