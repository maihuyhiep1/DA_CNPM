const path = require('path');

let getHomePage = (req, res) => {
  return res.send("This is a home page.")
}

let getLoginPage = (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/login.html'));
}

let getSignInPage = (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/signin.html'));
}

let postSignIn = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.send(`Email: ${email}, <br>Password: ${password}`);
}

module.exports = {
  getHomePage: getHomePage,
  getLoginPage: getLoginPage,
  getSignInPage: getSignInPage,
  
  postSignIn: postSignIn,
}