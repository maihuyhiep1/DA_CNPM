'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

class Comment extends Model {
  static associate(models) {
    // Define associations here
  
  // Comment.associate = (models) => {
  //   // Define associations here
  //   Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  //   Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
  //   Comment.hasMany(models.Comment, { foreignKey: 'commentId', as: 'replies' });
  // };
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // For replies to other comments
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'Comment',
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

  return Comment;
}