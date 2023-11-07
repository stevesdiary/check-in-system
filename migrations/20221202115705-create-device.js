'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('device', {
      device_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      visitor_id: {
        type: Sequelize.UUID
      },
      gadget_type: {
        type: Sequelize.STRING
      },
      product_type: {
        type: Sequelize.STRING
      },
      product_name: {
        type: Sequelize.STRING
      },
      serial_number: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('device');
  }
};