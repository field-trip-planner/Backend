const express = require("express");
const db = require("../../models/userModel/index");
const dbChaperone = require("../../models/chaperoneModel");
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
////RELATIONAL
router.get("/parents/:id", async(req, res) => {
  const { id } = req.params
  try{
    const parents = await db.getUserParentBySchoolId(id)
    res.status(200).json(parents)
  } catch(err) {
    res.status(500).json({ message: "User Server error", err:err })
  }
})
////
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

//get users that are parents by school id
router.get("/school/:id", async (req, res) => {
  //id is the school id
  const { id } = req.params;

  try {
    //db method handles getting users with role of parent
    const users = await db.getUserParentBySchoolId(id)
    res.status(200).json({ users: users });

  } catch (error) {

    res.status(500).json({
      message: `User Server Error `,
      error: error
    });
  }
});

const getAvailableChaperoneBySchoolAndTripIds = async (schoolId, tripId) => {
  //db method handles getting users with role of chaperone
  const users = await db.getUserChaperoneBySchoolId(schoolId);

  //This is to display correct list of possible chaperones on modal to choose from that are not already displayed in the chaperone table from the fieldtrip detail view
  const chaperonesByTripId = await dbChaperone.getChaperones(tripId);
  return users.filter((user) => {
    return !chaperonesByTripId.find((chaperone) => {
      return chaperone.id === user.id
    });
  });
};

//get users that are chaperones by school id
router.get("/chaperones/:tripId/:schoolId", async (req, res) => {
  const { tripId, schoolId } = req.params;
  // console.log("tripId", tripId);
  try {
    const filteredChaperones =
      await getAvailableChaperoneBySchoolAndTripIds(schoolId, tripId);

    res.status(200).json(filteredChaperones);
  } catch (error) {
    res.status(500).json({
      message: 'User Server Error',
      error: error
    })
  }
});

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
