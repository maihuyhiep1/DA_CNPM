
const { Sequelize } = require('sequelize');
require('dotenv').config();
const db = require('../models/index.js');


const {HOST, DATABASE, DB_USERNAME, DB_PASSWORD} = process.env;
const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: HOST,
  dialect: 'mysql',
});


let connectDB = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.');
    await db.sequelize.sync({
      alter: true,
      logging: false
    })
      .then(()=>{ console.log('Database synchronized.')})
      .catch(err => console.error('Error:', err));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
module.exports = connectDB;