'use strict';

const { default: sequelize } = require('../config/database.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {

    // name: DataTypes.STRING,
    // email: DataTypes.STRING,
    // hashed_pw: DataTypes.STRING,
    // post_count: DataTypes.STRING,
    // like_count: DataTypes.STRING,
    // avatar: DataTypes.STRING,
    // follower_count: DataTypes.STRING,
    // description: DataTypes.STRING,
    // role: DataTypes.STRING,
    // role: {
    //     type: DataTypes.ENUM,
    //     values: ['admin', 'user', 'moderator'],
    //     defaultValue: 'user'
    
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      hashed_pw: {
        type: Sequelize.STRING
      },
      post_count: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      avatar: {
        type: Sequelize.TEXT
      },
      follower_count: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      description: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin', 'user', 'moderator'], // Specify the allowed values for the ENUM
        defaultValue: 'user', // Set a default value
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};