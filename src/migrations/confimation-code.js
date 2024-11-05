'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Confirmation_Codes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: { // New field to track status
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active', // or 'used', etc.
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Confirmation_Codes'); // Revert the changes by dropping the table
  }
};
