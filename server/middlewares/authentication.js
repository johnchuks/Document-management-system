const jwt = require('jsonwebtoken'),
  secret = process.env.JWT_SECRET;


module.exports = {

  verifyJwtToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(400).send({ success: false, error });
        }
        req.decoded = decoded;
        return next();
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
      return res.status(401).json({
        message: 'You are not authorized',
      });
    }
  }
};
