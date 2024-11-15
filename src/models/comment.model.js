'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        allowNull: true,
      },
    },
    {
      timestamps: true, // Automatically adds `createdAt` and `updatedAt` columns
    }
  );

  // Comment.associate = (models) => {
  //   // Define associations here
  //   Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  //   Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
  //   Comment.hasMany(models.Comment, { foreignKey: 'commentId', as: 'replies' });
  // };

  return Comment;
};
