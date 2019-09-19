const express = require("express");
const db = require("../../models/userModel/index");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: `User Server error`,
      error: error
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: `the user with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json({
      message: `User Server Error `,
      error: error
    });
  }
});

router.get("/school", async (req, res) => {
  // console.log(req.params)
  const { school_id} = req.params;

  try {

    const users = await db.getUserBySchoolId(school_id)
    res.status(200).json({ users: users });
    
  } catch (error) {

    res.status(500).json({
      message: `User Server Error `,
      error: error
    });
  }

})

router.put("/:id", async (req, res) => {
  const userInfo = req.body;
  const { id } = req.params;
  try {
    const updatedInfo = await db.updateUser(id, userInfo);
    if (updatedInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({
        message: `User with id ${id} does not exist`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `User Server Error `,
      error: error
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.deleteUser(id);
    if (user) {
      res.status(200).json({
        message: `User with id ${id} has been deleted`
      });
    } else {
      res
        .status(404)
        .json({ message: `the user with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json({
      message: `User Server Error `,
      error: error
    });
  }
});

module.exports = router;
