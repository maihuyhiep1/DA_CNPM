const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // hoặc các loại khác như 'postgres', 'sqlite', 'mssql'
});

sequelize.authenticate()
    .then(() => console.log('Kết nối đến MySQL bằng Sequelize thành công'))
    .catch((err) => console.error('Lỗi khi kết nối:', err));

module.exports = sequelize;
