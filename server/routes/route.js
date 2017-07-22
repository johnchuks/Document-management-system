const documentController = require('../controllers/document');
const userController = require('../controllers/user');
const roleController = require('../controllers/role');
const auth = require('../middlewares/authentication.js');

module.exports = (app) => {
 // User Routes
  app.post('/api/v1/users/', userController.createUser);
  app.get('/api/v1/users/', auth.verifyJwtToken, auth.adminAccess, userController.getAllUsers);
  app.get('/api/v1/users/:id', auth.verifyJwtToken, userController.findUser);
  app.put('/api/v1/users/:id', auth.verifyJwtToken, userController.updateUser);
  app.delete('/api/v1/users/:id', auth.verifyJwtToken, userController.deleteUser);
  app.get('/api/v1/search/users/', auth.verifyJwtToken, auth.adminAccess, userController.searchUser);

 // Document Routes
  app.post('/api/v1/documents/', auth.verifyJwtToken, documentController.createDocument);
  app.get('/api/v1/documents/', auth.verifyJwtToken, documentController.getAllDocuments);
  app.get('/api/v1/documents/:id', auth.verifyJwtToken, documentController.findDocument);
  app.put('/api/v1/documents/:id', auth.verifyJwtToken, documentController.updateDocument);
  app.delete('/api/v1/documents/:id', auth.verifyJwtToken, documentController.deleteDocument);
  app.get('/api/v1/users/:id/documents', auth.verifyJwtToken,
  documentController.getSpecificUserDocuments);
  app.get('/api/v1/search/documents/', auth.verifyJwtToken, documentController.searchDocuments);

  // Role Routes
  app.post('/api/v1/roles/', auth.verifyJwtToken, auth.adminAccess, roleController.createRole);
  app.get('/api/v1/roles/', auth.verifyJwtToken, auth.adminAccess, roleController.getAllRoles);
  app.put('/api/v1/roles/:id', auth.verifyJwtToken, auth.adminAccess, roleController.updateRole);
  app.get('/api/v1/roles/:id', auth.verifyJwtToken, auth.adminAccess, roleController.findRole);
  app.delete('/api/v1/roles/:id', auth.verifyJwtToken, auth.adminAccess, roleController.deleteRole);

  // Login and Logout User Route
  app.post('/api/v1/users/login', userController.logInUser);
  app.post('/api/v1/logout', auth.verifyJwtToken, userController.logOutUser);
};

