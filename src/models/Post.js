// models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Post = sequelize.define('Post', {
    post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_qna: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    cmt_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'posts',
    timestamps: false,
});

module.exports = Post; // Đảm bảo export đúng mô hình Post

const PostImage = require('./postImage.js'); // Import mô hình PostImage



Post.hasMany(PostImage, {
    foreignKey: 'post_id',
    as: 'images',
    onDelete: 'CASCADE',
});