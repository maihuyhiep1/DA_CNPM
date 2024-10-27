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

testGetUserByID = async (id) => {
  try {
    let user = await userService.getUserByID(id);
    console.log(user);
  } catch (e) {
    if (e.name === 'SequelizeEmptyResultError') {
      console.log('User not found. do something!');
    }
    else {  console.log("Error in testGetUserByID:", e); }
  }
}


// Run all tests in sequence
(async () => {
  // await testCreateUser();
  await testGetUserByID(0);
  // Add more test functions as needed and call them here
})();


// Use node {directory}/test-UserServices.js to run