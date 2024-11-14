const userService = require('../services/user-services');
const passport = require('passport');
//API



// localhost:{port}/api/login
let handleLogin = async(req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      errCode: 4,
      message: "Missing parameter.",
    });
  }
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({
        errCode: info.errCode || null,
        message: info.message || null,
      });
    }

    // If user is authenticated, store user info in session
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Send the user data (excluding password) in the response
      return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        user: user,
      });
    });
  })(req, res, next);
}

//localhost{port}/api/create-new-user
let handleUserSignin_sentAuthCode = async (req, res) => {
      if (!req.body.email || !req.body.password || !req.body.username || !req.body.name) {
        return res.status(400).json({
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
        return res.status(400).json({
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