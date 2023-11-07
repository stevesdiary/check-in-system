'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin', {
      id: {
        allowNull: false,
        autoIncrement:true,
        defaultValue: Sequelize.INTEGER,
      },
      admin_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4,
        // allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      role_id: {
        type: Sequelize.UUIDV4,
      },
      visitor_id: {
        type: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
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
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admin');
  }
};