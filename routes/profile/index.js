const router = require('express').Router();



const authCheck = (req, res, next) => {
  if(!req.user){
    //if user is not logged in
    console.log('auth here', req)
    res.redirect('http://localhost:3000/youshallnotpass')
  }else{
    //if logged in
    next();
  }
}

router.get('/', authCheck, (req, res) => {
  // res.redirect(`http://localhost:3000/dashboard`);
  // res.json({user: req.user});
  console.log('look here:', req.body);
  res.render('profile')

});

router.get('/data', (req, res) => {
  console.log({user: req.user})
})



module.exports = router; 