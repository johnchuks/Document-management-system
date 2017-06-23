module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role', [{
      title: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'regular',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'guest',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  }
};
