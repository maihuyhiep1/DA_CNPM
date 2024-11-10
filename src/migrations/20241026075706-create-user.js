'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      hashed_pw: {
        type: Sequelize.STRING,
        allowNull: true // Null for Google accounts
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true, // Null for local accounts
      },
      authProvider: {
        type: Sequelize.ENUM,
        values: ['local', 'google'],
        allowNull: false
      },
      post_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      avatar: {
        type: Sequelize.TEXT
      },
      follower_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin', 'user', 'moderator'],
        defaultValue: 'user'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
