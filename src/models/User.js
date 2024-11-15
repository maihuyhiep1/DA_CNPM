// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Đảm bảo bạn đã cấu hình sequelize đúng cách

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true, // UUID dạng chuỗi 36 ký tự
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false, // Tên người dùng không thể trống
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false, // Email không thể trống
    unique: true, // Đảm bảo email là duy nhất
  },
  hashed_pw: {
    type: DataTypes.STRING(255),
    allowNull: false, // Mật khẩu đã băm không thể trống
  },
  post_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Mặc định số bài đăng là 0
  },
  like_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Mặc định số lượt thích là 0
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true, // Link ảnh đại diện có thể trống
  },
  follower_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Mặc định số người theo dõi là 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Mô tả có thể trống
  },
  role: {
    type: DataTypes.ENUM('User', 'Mod', 'Admin'),
    defaultValue: 'User', // Vai trò mặc định là User
  },
}, {
  tableName: 'users', // Tên bảng trong cơ sở dữ liệu
  timestamps: false, // Không sử dụng auto timestamps
});

module.exports = User;

const Post = require('./post');
const PostLike = require('./PostLike.js'); 
Post.belongsTo(User, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE', // Xóa tất cả bài viết khi người dùng bị xóa
  });

