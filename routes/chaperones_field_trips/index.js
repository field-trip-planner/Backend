const express = require("express");
const router = express.Router();
const db = require("../../models/chaperones_field_tripsModel");


router.delete("/chaperone/:id", (req, res) => {
  const { id } = req.params;

  
})