const db = require("../model");
const Sql = db.sql;
const Op = db.Sequelize.Op;

// Create and Save a new row
exports.create = (req, res) =>{
    // Validate Request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create a new row
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : flase
    };

    //Save it in db
    Sql.create(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send{
            message:
            err.message || "Some error occurred while creating the Tutorial."
        }
    })
};

// Retrieve all data
exports.findAll = (req, res) =>{

};

// Find a single row with id
exports.findOne = (req, res) =>{

};

// Update an existing row
exports.update = (req, res) =>{

};

// Delete a single row by id
exports.delete = (req, res) =>{

};

// Delete all the data from db
exports.deleteAll = (req, res) =>{

};

// I'm not sure
exports.findAllPublished = (req, res) =>{

};