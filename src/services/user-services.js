const db = require('../models/index');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

/**
 * Creates a new user in the database.
 * 
 * This function takes user registration information from the request body,
 * hashes the password, and then saves the new user in the database.
 *
 * @param {Object} body - The registration information for the new user.
 * @returns {Promise<string>} A promise that resolves to a success message 
 * @throws {Error} Will throw an error if there is an issue during user creation.
 */
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
  return new Promise((resolve, reject) => {
    try {
      let hashed_pw =  bcrypt.hashSync(password, salt);
      resolve(hashed_pw);
    } catch (e) {
        reject(e);
    }
  })
}

let checkUserPassword = (password, hashed_pw) => {
  return new Promise((resolve, reject) => {
    try {
      let isMatch = bcrypt.compareSync(password, hashed_pw);
      resolve(isMatch);
    } catch(e) {
      reject(e);
    }
  })
}

/**
 * Retrieves user information by user ID.
 * 
 * If the user is found, it resolves with the user data; 
 * otherwise, it resolves with an empty object.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object if found, or an empty object if not found.
 * @throws {Error} Will throw an error if there is an issue during the retrieval process.
 */
let getUserInfoByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findByPk(id, { raw: true, });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};


/**
 * Updates user information for a given user ID.
 * 
 * Field name should be the same as ones stored in database.
 * 
 * @param {number} id - The ID of the user to update.
 * @param {Object} [updateData] - An object containing the fields to update, can be leaved as null.
 */
let updateUserInfo = (id, updateData) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (!updateData || Object.keys(updateData).length === 0) {
        resolve(); 
      }     
      let user = await db.User.findByPk(id);
      if (user) {
        for (const key in updateData) {
          user[key] = updateData[key];
        }
        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  })
}



module.exports = {
  createUser: createUser,
  getUserInfoByID: getUserInfoByID,
  updateUserInfo: updateUserInfo,
  checkUserPassword: checkUserPassword,
  hashUserPassword: hashUserPassword,
}