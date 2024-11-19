const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Import mô hình User
const Post = require('./post'); // Import mô hình Post

// Định nghĩa mô hình PostLike
const PostLike = sequelize.define('PostLike', {
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
  tableName: 'post_likes', // Tên bảng trong cơ sở dữ liệu
  timestamps: false, // Tắt auto timestamps nếu không cần
});

// Quan hệ với User
PostLike.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'CASCADE', // Khi xóa User thì các like liên quan cũng sẽ bị xóa
});

// Quan hệ với Post
PostLike.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post',
  onDelete: 'CASCADE', // Khi xóa Post thì các like liên quan cũng sẽ bị xóa
});

module.exports = PostLike;
