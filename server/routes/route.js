const documentController = require('../controllers/document');
const userController = require('../controllers/user');
const roleController = require('../controllers/role');

module.exports = (app) => {
 // User Routes
  app.post('/users/', userController.createUser);
  app.get('/api/users/', userController.getAllUsers);
  app.get('/api/users/:id', userController.findUser);
  app.put('/api/users/:id', userController.updateUser);
  app.delete('/api/users/:id', userController.deleteUser);

 // Document Routes
  app.post('/api/documents/', documentController.createDocument);
  app.get('/api/documents/', documentController.getAllDocuments);
  app.get('/api/documents/:id', documentController.findDocument);
  app.put('/api/documents/:id', documentController.updateDocument);
  app.delete('/api/documents/:id', documentController.deleteDocument);
  app.get('/api/users/:id/documents', documentController.getSpecificUserDocuments);

  // Role Routes
  app.post('/roles/', roleController.createRole);
  app.get('/roles/', roleController.getRole);

  // Login and Logout User Route
  app.post('/users/login', userController.logInWithJwt);
};

