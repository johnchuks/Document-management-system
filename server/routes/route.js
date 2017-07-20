const documentController = require('../controllers/document');
const userController = require('../controllers/user');
const roleController = require('../controllers/role');
const auth = require('../middlewares/authentication.js');

module.exports = (app) => {
 // User Routes
  app.post('/users/', userController.createUser);
  app.get('/api/users/', auth.adminAccess, userController.getAllUsers);
  app.get('/api/users/:id', userController.findUser);
  app.put('/api/users/:id', userController.updateUser);
  app.delete('/api/users/:id', userController.deleteUser);
  app.get('/api/search/users/', auth.adminAccess, userController.searchUser);

 // Document Routes
  app.post('/api/documents/', documentController.createDocument);
  app.get('/api/documents/', documentController.getAllDocuments);
  app.get('/api/documents/:id', documentController.findDocument);
  app.put('/api/documents/:id', documentController.updateDocument);
  app.delete('/api/documents/:id', documentController.deleteDocument);
  app.get('/api/users/:id/documents',
  documentController.getSpecificUserDocuments);
  app.get('/api/search/documents/', documentController.searchDocuments);

  // Role Routes
  app.post('/api/roles/', auth.adminAccess, roleController.createRole);
  app.get('/api/roles/', auth.adminAccess, roleController.getAllRoles);
  app.put('/api/roles/:id', auth.adminAccess, roleController.updateRole);
  app.get('/api/roles/:id', auth.adminAccess, roleController.findRole);
  app.delete('/api/roles/:id', auth.adminAccess, roleController.deleteRole);

  // Login and Logout User Route
  app.post('/users/login', userController.logInUser);
  app.post('api/logout', userController.logOutUser);
};

