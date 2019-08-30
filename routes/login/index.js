const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.send('logged in')
});

router.get('logout', (req,res) => {
  res.send('logging out')
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}) 
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached the callback URL')
})


module.exports = router;