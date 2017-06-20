module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Document', [{
      title: 'John Doe',
      content: 'eze goes to school',
      access: 'public',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'John naddddd',
      content: 'John watches american gods regularly',
      access: 'private',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'James Hannn',
      content: 'Han is a bad guy',
      access: 'role',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Document', null, {});
  }
};
