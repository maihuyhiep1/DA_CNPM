'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashed_pw: {
      type: DataTypes.STRING,
      allowNull: true, // For local accounts only
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true, // For Google accounts only
    },
    authProvider: {
      type: DataTypes.ENUM,
      values: ['local', 'google'],
      allowNull: false,
    },
    post_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avatar: DataTypes.TEXT,
    follower_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user', 'moderator'],
      defaultValue: 'user',
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true, // Prevents createdAt and updatedAt columns
  });

  return User;
};
