const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },


  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Document, {
          foreignKey: 'userId'
        });
        User.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });
      }
    },
    freezeTableName: true,
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
      generateHashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
      },
    },
    hooks: {
      beforeCreate(user) {
        user.generateHashPassword();
      }
    }
  });
  return User;
};
