'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Role.hasMany(models.Admin, {
      //   foreignKey: 'role_id',
      // });
      // Role.belongsToMany(models.Permission, {
      //   through: 'RolePermission',
      //   as: 'permissions',
      //   foreignKey: 'role_id'
      // });
    }
  };
  Role.init({
    role_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_description: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: 'role',
    modelName: 'Role',
  });
  return Role;
};