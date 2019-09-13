const express = require("express");
const uuid = require("uuid/v4");
const db = require("../../models/schoolModel/index");
const router = express.Router();

/*
@GET: all schools
@PARAMS: none
@ROUTE: "/schools"
*/
router.get("/", async (req, res) => {
  try {
    const schools = await db.getSchools();

    if (schools.length) {
      res.status(200).json(schools);
    } else {
      res.status(404).json({ message: `No schools found` });
    }
  } catch (err) {
    res.status(500).json({ error: `Unable to retrieve schools` });
  }
});

/*
@GET: schools
@PARAMS: id[STRING]!
@ROUTE: "/schools/:id"
*/
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const school = await db.getSchoolById(id);

    if (!school) {
      return res.status(404).json({ message: "school not found" });
    }

    res.status(200).json(school);
  } catch (err) {
    res.status(500).json({
      err,
      message: "Unable to process request"
    });
  }
});

/*
@POST: create new school
@PARAMS: name[STRING]!
@ROUTE: "/schools"
*/
router.post("/", async (req, res) => {
  const newSchool = { id: uuid(), ...req.body };

  try {
    const { school_name, address, category, city, state, zip_code } = newSchool;

    const schools = await db.getSchools();

    const result = schools.filter(school => {
      return school_name === school.school_name;
    });

    if (!school_name || !address || !category || !city || !state || !zip_code) {
      return res.status(400).json({
        error: " all fields are required"
      });
    } else if (result.length) {
      return res.status(400).json({
        message: `${school_name} already exist`
      });
    } else {
      const schoolAdded = await db.addSchool(newSchool);

      res.status(201).json(schoolAdded);
    }
  } catch (err) {
    return res.status(500).json({
      err,
      message: "Unable to process request"
    });
  }
});

/*
@PUT: update school
@PARAMS: id[STRING]! name[STRING]!
@ROUTE: "/schools/id"
*/
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const changes = req.body;

  const { school_name } = changes;

  if (!school_name) {
    return res.status(400).json({
      message: "provide a school name"
    });
  }

  try {
    const school = await db.getSchoolById(id);

    if (!school) {
      return res.status(404).json({
        message: "school not found"
      });
    } else {
      await db.updateSchool(id, changes);

      const updatedSchool = await db.getSchoolById(id);

      return res.status(200).json({
        updatedSchool,
        message: `${school.school_name} has been updated to ${updatedSchool.school_name}`
      });
    }
  } catch (err) {
    res.status(500).json({
      err,
      message: "Unable to process request"
    });
  }
});

/*
@DELETE: school
@PARAMS: id[STRING]!
@ROUTE: "/schools/:id"
*/
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const school = await db.getSchoolById(id);

    if (!school) {
      return res.status(404).json({
        message: "school not found"
      });
    } else {
      await db.deleteSchool(id);

      return res.status(200).json({
        message: `${school.school_name} has been deleted`
      });
    }
  } catch (err) {
    res.status(500).json({
      err,
      message: "Unable to process request"
    });
  }
});

module.exports = router;
