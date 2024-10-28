//TEST FILE

const userService = require('./user-services');

// Test function for creating a user
async function testCreateUser() {
  try {
    const testBody = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'TestPassword123',
    };
    const result = await userService.createUser(testBody);
    console.log("testCreateUser:", result);
  } catch (error) {
    console.error("Error in testCreateUser:", error);
  }
}

testGetUserInfoByID = async (id) => {
  try {
    let user = await userService.getUserInfoByID(id);
    console.log(user);
  } catch (e) {
    console.log("Error in testGetUserByID:", e);
  }
}


async function testUpdateUserInfo(id) {
  try {
    let testBody = {
      name: 'updated user',
      avatar: 'https:/example',
      hashed_pw: 'hahahihihih'
    };
    
    testBody.hashed_pw = await userService.hashUserPassword(testBody.hashed_pw);
    await userService.updateUserInfo(id, testBody);
  } catch (error) {
    console.error("Error in testUpdateUserInfo:", error);
  }
}




// Run all tests in sequence
(async () => {
  // await testCreateUser();
  // await testGetUserInfoByID(1);
  await testUpdateUserInfo(1);
  // Add more test functions as needed and call them here
})();



// Use node {directory}/test-UserServices.js to run