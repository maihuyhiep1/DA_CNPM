'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    static associate(models) {
      // Define associations here
      // Quan hệ với Post
      this.belongsTo(models.Post, {
        foreignKey: "post_id",
        as: "post",
        onDelete: "CASCADE", // Khi xóa Post thì các like liên quan cũng sẽ bị xóa
      });
    }
  }
// Định nghĩa mô hình PostLike
  PostLike.init({
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  post_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'PostLike', // Tên mô hình
  tableName: 'post_likes', // Tên bảng trong cơ sở dữ liệu
  timestamps: false, // Tắt auto timestamps nếu không cần
});

  return PostLike;
}