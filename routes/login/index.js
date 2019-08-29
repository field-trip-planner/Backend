const express = require('express');
const db = require('');
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
)


module.exports = router;