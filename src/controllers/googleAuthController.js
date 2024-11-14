const passport = require("passport");

let callbackUser = (req, res) => {
   // Successful authentication
    const { id, name, avatar, role } = req.user;
    res.status(200).json({
      errCode: 0,
      message: 'Ok',
      user: { id, name, avatar, role },
    });
}

const loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      errCode: 0,
      message: "Successfully logged in.",
    });
  } else {
    res.status(403).json({
      errCode: 2,
      message: "Not authorized.",
    });
  }
};

const loginFailed = (req, res) => {
  res.status(401).json({
    errCode: 1,
    message: "Login failure",
  });
};

const userLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        errCode: 1,
        message: "Logout failed.",
      });
    }
    res.redirect("/"); // Redirect to home page after logout
  });
};

module.exports = {
  loginSuccess: loginSuccess,
  loginFailed: loginFailed,
  userLogout: userLogout,
  callbackUser: callbackUser,
};