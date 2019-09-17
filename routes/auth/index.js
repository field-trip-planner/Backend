const express = require('express');
const router = express.Router();
const passport = require('passport');



const authCheck = (req, res, next) => {
  //checks for cookie session token from client
  if(!req.session.token) {
    //if token does not exist
    res.cookie('token', '')
    res.json({
      status: 'session cookie not set'
    });
  }else {
    //if token exists, move on 
    next();
  }
}



//Google Consent Screen Endpoint. Allows for interfacing with google api
router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

//Endpoint that sets cookie session and then redirects to dashboard view
router.get('/google/redirect', passport.authenticate('google', {
  failureRedirect: 'http://localhost:3000/no'
}),(req, res) => {
  req.session.token = req.user.token;
  res.redirect('http://localhost:3000/dashboard')
});

//Endpoint for auth checking client cookie session and then sending user data to client
//can refactor to write an auth check middle ware
router.get('/login', authCheck, (req, res) => {
  res.cookie('token', req.session.token);
  res.json({
    user: req.user
  });
  // if(req.session.token) {
  //   res.cookie('token', req.session.token);
  //   res.json({
  //     user: req.user
  //   })
  // }else {

  //   res.cookie('token', '')
  //   res.json({
  //     status: 'session cookie not set'
  //   });
  // }
});

//Endpoint that logsout client and destroys user data residing in the cookie
router.get('/logout', (req,res) => {

  req.logout();
  req.session = null;
  res.json({
    loggedOut: true
  });
}); 


module.exports = router;