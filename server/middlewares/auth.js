// const jwt = require('jsonwebtoken'),
//   secret = process.env.JWTSECRET

// exports.requiresLogin = function (req, res, next) {
//   if (!req.isAuthenticated()) {
//     return res.send(401, 'User is not authorized');
//   }
//   next();
// };

// /**
//  * User authorizations routing middleware
//  */
// exports.user = {
//   hasAuthorization(req, res, next) {
//     if (req.profile.id !== req.user.id) {
//       return res.send(401, 'User is not authorized');
//     }
//     next();
//   }
// };

// // Routing process of the middleware to verify a user token
// exports.checkToken = (req, res, next) => {
//   // checking header or url parameters or post parameters for token
//   if (req.url.startsWith('/auth')) return next();
