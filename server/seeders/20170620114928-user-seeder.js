const bcrypt = require('bcrypt-nodejs');
const env = require('dotenv').config();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      id: 1,
      fullName: 'admin',
      userName: 'admin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync(process.env.PASSWORD, bcrypt.genSaltSync(8), null),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      fullName: 'test user',
      userName: 'user',
      email: 'test@test.com',
      password: bcrypt.hashSync('testuser', bcrypt.genSaltSync(8), null),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
