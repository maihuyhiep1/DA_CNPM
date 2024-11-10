
const { Sequelize } = require('sequelize');
require('dotenv').config();



const {HOST, DATABASE, USERNAME, PASSWORD} = process.env;
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql' 
});

let connectDB = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
module.exports = connectDB;