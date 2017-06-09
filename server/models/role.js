module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true

    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    },
    freezeTableName: true
  });
  return Role;
};
