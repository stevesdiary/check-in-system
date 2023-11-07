'use strict';
const { UUIDV4 } = require('sequelize');
const { DataTypes } = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.belongsTo(models.Visitor, {
        foreignKey: 'device_id',
        as: 'device',
      });
      // define association here
    }
  }
  Device.init({
    device_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    visitor_id: {
      type: DataTypes.UUID
    },
    gadget_type: {
      type: DataTypes.STRING
    },
    product_name: {
      type: DataTypes.STRING
    },
    serial_number: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'device',
    modelName: 'Device',
    paranoid: true,
    pluralize: false
  });
  return Device;
};