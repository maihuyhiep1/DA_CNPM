const userService = require('../services/user-services');
//API



// localhost:{port}/api/login
let handleLogin = async(req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode:4,
      message: 'Missing parameter.',
    })
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    user: userData.user ? userData.user : {},
  })
}

//localhost{port}/api/create-new-user
let handleUserSignin_sentAuthCode = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode:4,
      message: 'Missing parameter.',
    })
  }
  let message = await userService.handleUserSignin_sentAuthCode(email);
  // let message = await userService.createUser(req.body);
  return res.status(200).json({
    errCode: message.errCode,
    message: message.message
  });
}

let handleUserSignin_verifyAuthCode = async (req, res) => {
      const {email, password, code} = req.body;
      if (!email || !password) {
        return res.status(500).json({
          errCode:4,
          message: 'Missing parameter.',
        })
      }
    let message = await userService.handleUserSignin_verifyAuthCode(email, password, code);
    return res.status(200).json({
      errCode: message.errCode,
      message: message.message
    })
    
}


module.exports = {
  handleLogin: handleLogin,
  handleUserSignin_sentAuthCode: handleUserSignin_sentAuthCode,
  handleUserSignin_verifyAuthCode: handleUserSignin_verifyAuthCode,
}