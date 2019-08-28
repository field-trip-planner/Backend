const express = require('express');
const db = require('../../models/userModel/index');
const router =  express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await db.getUsers();
        res.status(200).json(users);
    } catch(error){
    res.status(500).json({
        message: `User Server error`,
        error: error 
    })
  }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const user = await db.getUserById(id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: `the user with id ${id} does not exist`})
        }
    } catch(error){
        res.status(500).json({
        message: `User Server Error `,
        error: error 
    })
  }
})

router.post('/', async(req, res) => {
  const {user} = req.body;
  try{
  if(req.body.first_name === '' & req.body.last_name == '') {
        res.status(400).json({message: `Please Provide a first name and a last name`});
    } else {
          const User = await db.addUser(req.body);
          res.status(201).json(User);
    }
  } catch(error){
      res.status(500).json({
          message: `User Server Error `,
          error: error 
    })
  }
})

router.put('/:id', async(req, res) => {
  const userInfo = req.body;
  const {id} = req.params;
  try {
      const userUpdated = await db.updateUser(id, userInfo);
      if(userUpdated) {
          res.status(200).json(userInfo);
      } else {
          res.status(404).json({
          message: `User with id ${id} does not exist`
        })
      }
  } catch(error){
      res.status(500).json({
          message: `User Server Error `,
          error: error 
      })
  }
});

router.delete('/:id', async(req, res) => {
  const {id} = req.params;
  try {
      const user = await db.deleteUser(id);
      if(user) {
          res.status(200).json({ 
              message: `User with id ${id} has been deleted`
          })
      } else {
          res.status(404).json({message: `the user with id ${id} does not exist`})
      }
  } catch(error){
    res.status(500).json({
        message: `User Server Error `,
        error: error 
    })
  }
})


module.exports = router;