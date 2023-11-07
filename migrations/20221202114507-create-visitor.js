'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visitor', {

      visitor_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4
      },
      device_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        // allowNull: false,
      },
      admin_id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
      purpose: {
        type: Sequelize.STRING
      },
      host: {
        type: Sequelize.STRING
      },
      arrival: {
        type: Sequelize.TIME
      },
      departure: {
        type: Sequelize.TIME
      },
      tag_number: {
        type: Sequelize.INTEGER
      },
      image_path: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('visitor');
  }
};