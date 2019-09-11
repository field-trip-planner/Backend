const express = require('express');
const router = express.Router();
const passport = require('passport');

//token code
const jwt = require('jsonwebtoken');

let currentUser = {};

router.get('/login', (req, res) => {
  res.send('logged in')
});


router.get('/logout', (req,res) => {
  req.logout();
  // res.redirect('http://localhost:3000')
  res.send('You are logged out')
}); 

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}) 
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // console.log('THE USER IS', req.user)
  currentUser= req.user;
  res.redirect('http://localhost:3000/dashboard')
  // res.redirect('/profile');

  //token code
});

router.get('/profile', (req, res) => {
  // console.log('THE USER IS', req.user)
  res.json(currentUser);
  currentUser = {};

});


router.get('/test', (req, res) => {
  res.status(200).json({user: req.user})
})


module.exports = router;