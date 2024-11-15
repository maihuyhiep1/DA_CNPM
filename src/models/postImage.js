// models/PostImage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./post'); // Import mô hình Post đúng cách

const PostImage = sequelize.define('PostImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    post_id: {
        type: DataTypes.UUID, // Kiểu UUID cho khóa ngoại
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'post_images',
    timestamps: false, // Tắt auto timestamps nếu không cần
});

PostImage.belongsTo(Post, {
    foreignKey: 'post_id',
    as: 'post',
    onDelete: 'CASCADE', // Khi xóa bảng posts, các bản ghi liên quan trong post_images cũng bị xóa
});

module.exports = PostImage;
