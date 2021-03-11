const authCtrl = {};

const passport = require('passport');

const log4js = require('log4js');

let logger = log4js.getLogger('index.js');
logger.level = 'all';

authCtrl.renderSignUp = (req, res) => {
    logger.info(`Se creará un usuario ${req.ip}`)
    res.render('auth/signup');
};

authCtrl.signUp = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
});

authCtrl.renderSignIn = (req, res, next) => {
    logger.info(`Se iniciará sesión ${req.ip}`)
    res.render('auth/signin');
};

authCtrl.signIn = passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
});

authCtrl.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

module.exports = authCtrl;