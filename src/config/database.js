
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
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