const userService = require('../services/user-services');
//API



// localhost:{port}/api/login
let handleLogin = async(req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.status(500).json({
      errCode:4,
      message: 'Missing parameter.',
    })
  }
  let userData = await userService.handleUserLogin(username, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    user: userData.user ? userData.user : {},
  })
}

//localhost{port}/api/create-new-user
let handleUserSignin_sentAuthCode = async (req, res) => {
      if (!req.body.email || !req.body.password || !req.body.username || !req.body.name) {
        return res.status(500).json({
          errCode:4,
          message: 'Missing parameter.',
        })
      }
  let message = await userService.handleUserSignin_sentAuthCode(req.body.email);
  // let message = await userService.createUser(req.body);
  return res.status(200).json({
    errCode: message.errCode,
    message: message.message
  });
}

let handleUserSignin_verifyAuthCode = async (req, res) => {
      if (!req.body.email || !req.body.password || !req.body.username || !req.body.name || !req.body.code) {
        return res.status(500).json({
          errCode:4,
          message: 'Missing parameter.',
        })
      }
    let message = await userService.handleUserSignin_verifyAuthCode(req.body, req.body.code);
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