const db = require('../config/db');

const Post = {
    getAllPosts: (callback) => {
        db.query('SELECT * FROM posts', callback);
    },

    getPostById: (id, callback) => {
        db.query('SELECT * FROM posts WHERE post_id = ?', [id], callback);
    },

    createPost: (post, callback) => {
        const { title, author_id, content, avatar } = post;
        db.query(
            'INSERT INTO posts (title, author_id, content, avatar) VALUES (?, ?, ?, ?)',
            [title, author_id, content, avatar],
            callback
        );
    },

    deletePost: (id, callback) => {
        db.query('DELETE FROM posts WHERE post_id = ?', [id], callback);
    }
};

module.exports = Post;
