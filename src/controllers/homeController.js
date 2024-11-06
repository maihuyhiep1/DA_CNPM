const path = require('path');

let getHomePage = (req, res) => {
  return res.send("This is a home page.")
}


let postSignIn = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.send(`Email: ${email}, <br>Password: ${password}`);
}

module.exports = {
  getHomePage: getHomePage,
  
  postSignIn: postSignIn,
}