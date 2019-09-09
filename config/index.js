const LocalStrategy = require("passport-local");
const db = require("../models/userModel");
const bcrypt = require("bcryptjs");

const initialize = passport => {
  const authenticateUser = async (email, password, done) => {
    const user = await db.getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "Login Failed." });
    }
    try {
      if (await bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Login Failed" });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, db.getUserById(id));
  });
};

module.exports = initialize;
