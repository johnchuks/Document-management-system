const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
      defaultvalue: 2
    },


  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          hooks: true
        });
        User.belongsTo(models.Role, {

          foreignKey: 'roleId'
        });
      }
    },
    freezeTableName: true,
    instanceMethods: {
      isValidPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
      generateHashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
      },
    },
    hooks: {
      beforeCreate(user) {
        user.generateHashPassword();
      },
      beforeUpdate(user) {
        user.generateHashPassword();
      }
    }
  });
  return User;
};
