const bcrypt = require("bcryptjs");

const hash = (req, res, next) => {
  let user = req.body;
  if (user.password.length < 8) {
    res.status(400).json({ message: "Password length must be 8 characters" });
  }
  if (!user.password) {
    res.status(400).json({ message: "You must enter a password" });
  } else {
    const hashPass = bcrypt.hashSync(user.password, 10);
    user.password = hashPass;
    next();
  }
};

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  if (!req.isAuthenticated()) {
    res.redirect("/login/test");
  }
}

module.exports = {
  hash,
  checkAuth
};
