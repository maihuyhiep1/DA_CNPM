'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: 'post_id',
        as: 'post',
        onDelete: 'CASCADE', 
      });

      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE', 
      });
    }
  }

  Notification.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Khóa chính kết hợp với post_id
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Notification', // Tên mô hình
      tableName: 'notification', // Tên bảng trong cơ sở dữ liệu
    }
  );

  return Notification;
};
