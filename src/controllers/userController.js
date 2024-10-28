const userService = require('../services/user-services');
//API


//example: router.post('/api/login', userController.handleLogin);


let handleLogin = async(req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode:1,
      message: 'Missing parameter.',
    })
  }
  let userData = await userService.handleUserLogin(email, password);


  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  })
}


module.exports = {
  handleLogin: handleLogin,
}