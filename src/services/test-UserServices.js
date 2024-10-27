//TEST FILE

const createUser = require('./user-services');


(async () => {
  try {
    const testBody = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'TestPassword123',
    };

    const result = await createUser.createUser(testBody);
    console.log(result);
  } catch (error) {
    console.error('Error creating user:', error);
  }
})();
// Use node {directory}/test-UserServices.js to run