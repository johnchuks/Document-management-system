const documentController = require('../controllers/document');
const userController = require('../controllers/user');
const roleController = require('../controllers/role');

module.exports = (app) => {
 // User Routes
  app.post('/users/', userController.createUser);
  app.get('/users/', userController.getUser);
  app.get('/users/:id', userController.findUser);
  app.put('/users/:id', userController.updateUser);
  app.delete('/users/:id', userController.deleteUser);

 // Docuemnt Routes
  app.post('/documents/', documentController.createDocument);
  app.get('/documents/', documentController.loadDocument);
  app.get('/documents/:id', documentController.findDocument);
  app.put('/documents/:id', documentController.updateDocument);
  app.delete('/documents/:id', documentController.deleteDocument);

  // Role Routes
  app.post('/roles/', roleController.createRole);
  app.get('/roles/', roleController.getRole);

  // Login and Logout User Route
  app.post('/users/login', userController.logInWithJwt);
};

