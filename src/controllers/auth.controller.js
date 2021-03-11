const authCtrl = {};

const passport = require("passport");
const log4js = require("log4js");
const logger = log4js.getLogger("data");

authCtrl.renderSignUp = (req, res) => {
  res.render("auth/signup");
};

authCtrl.signUp = passport.authenticate("local.signup", {
  successRedirect: "/profile",
  failureRedirect: "/signup",
  failureFlash: true,
});

authCtrl.renderSignIn = (req, res, next) => {
  res.render("auth/signin");
};

authCtrl.signIn = passport.authenticate("local.signin", {
  successRedirect: "/profile",
  failureRedirect: "/signin",
  failureFlash: true,
});

authCtrl.logout = (req, res, next) => {
  console.log("Se ha cerrado una sesión desde la IP" + req.ip); //------------------
  logger.info("Se ha cerrado una sesión desde la IP" + req.ip);
  req.logOut();
  res.redirect("/");
};

module.exports = authCtrl;
