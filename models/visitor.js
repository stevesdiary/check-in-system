'use strict';
const {
  Model, UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Visitor.belongsTo(models.Admin, {foreignKey: 'visitor_id'})

      Visitor.hasMany(models.Device, {foreignKey: 'visitor_id'})

      
    }
  }
  Visitor.init(
    {
      visitor_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      host: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // guests: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   defaultValue: 1
      // },
      arrival: {
        type: DataTypes.TIME,
        allowNull: false,
        // defaultValue: sequelize.fn('NOW')
      },
      departure: {
        type: DataTypes.TIME,
      },
      tag_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_path: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: sequelize.fn('NOW')
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "visitor",
      modelName: "Visitor",
      paranoid: true,
      pluralize: false,
    }
  );
  return Visitor;
}; 