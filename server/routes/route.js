const documentController =
  require('../controllers/document');
const userController = require('../controllers/user');

module.exports = (app) => {
 // User Routes
  app.post('../users/', userController.createUser);

 // Docuemnt Routes
  app.post('/documents/', documentController.createDocument);

  // Role Routes
  app.post('/roles');
};

