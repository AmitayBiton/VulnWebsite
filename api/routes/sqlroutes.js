
var express = require('express');
var router = express.Router();
var sql = require("../controller/sql.controller.js");

// Create a new Tutorial
router.post('/', sql.create);

 // Retrieve all Tutorials
router.get("/", sql.findAll);
  
// Retrieve all published Tutorials
router.get("/published", sql.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", sql.findOne);

// Update a Tutorial with id
router.put("/:id", sql.update);

// Delete a Tutorial with id
router.delete("/:id", sql.delete);

// Delete all Tutorials
router.delete("/", sql.deleteAll);

module.exports = router;


  