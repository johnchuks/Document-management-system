const documentController =
  require('../controllers/document');
const userController = require('../controllers/user');
const roleController = require('../controllers/role');

module.exports = (app) => {
 // User Routes
  app.post('/users/', userController.createUser);
  app.get('/users/', userController.getUser);

 // Docuemnt Routes
  app.post('/documents/', documentController.createDocument);
  app.get('/documents/', documentController.loadDocument);

  // Role Routes
  app.post('/roles/', roleController.createRole);
};

