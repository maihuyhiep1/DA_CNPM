
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();



const {HOST, DATABASE, USERNAME, PASSWORD} = process.env;
const sequelize = new Sequelize(HOST, DATABASE, USERNAME, PASSWORD, {
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