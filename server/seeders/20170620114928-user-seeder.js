const bcrypt = require('bcrypt-nodejs');
const env = require('dotenv').config();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      fullName: 'Johnbosco Ohia',
      userName: 'admin',
      email: 'johnbosco.ohia@andela.com',
      password: bcrypt.hashSync(process.env.PASSWORD, bcrypt.genSaltSync(8), null),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      fullName: 'test user',
      userName: 'user',
      email: 'test@test.com',
      password: bcrypt.hashSync('testuser', bcrypt.genSaltSync(8), null),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      fullName: 'jame doe',
      userName: 'testdoe',
      email: 'testdoe@andela.com',
      password: bcrypt.hashSync('jamestest', bcrypt.genSaltSync(8), null),
      roleId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: 'mayowa mack',
      userName: 'mayor',
      email: 'mayor@andela.com',
      password: bcrypt.hashSync('jamestest', bcrypt.genSaltSync(8), null),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
