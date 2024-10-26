const db = require('../models/index');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

let createUser = async (body) => { //body of html file which contains register information
  return new Promise(async (resolve, reject) => {
    try {
      let hashedPwFromBcrypt = await hashUserPassword(body.password);
      await db.User.create({
        name: body.name,
        email: body.email,
        hashed_pw: hashedPwFromBcrypt,
        role: 'user',
      })
      resolve('New user has been created.');
    } catch (e) {
      reject(e);
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashed_pw = await bcrypt.hashSync(password, salt);
      resolve(hashed_pw);
    } catch (e) {
        reject(e);
    }
  })
}



module.exports = {
  createUser: createUser
}