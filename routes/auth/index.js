const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/login', (req, res) => {
  res.send('logged in')
});

router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
  
}));

router.get('/google/redirect', passport.authenticate('google', {
  failureRedirect: 'http://localhost:3000/no'
}),(req, res) => {
  req.session.token = req.user.token;
  res.redirect('http://localhost:3000/dashboard')
});

router.get('/profile', (req, res) => {
  if(req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
      user: req.user
    })
  }else {

    res.cookie('token', '')
    res.json({
      status: 'session cookie not set'
    });
  }
});


router.get('/logout', (req,res) => {
  req.logout();
  // res.redirect('http://localhost:3000')
  // res.send('You are logged out')
  req.session = null;
  // console.log('you are logged out')
  res.json({
    loggedOut: true
  });
  // res.redirect('http://localhost:3000/')
}); 


module.exports = router;