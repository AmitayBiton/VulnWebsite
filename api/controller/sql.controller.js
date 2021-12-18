var db = require("../model");
var Sql = db.sql;
var Op = db.Sequelize.Op;

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
    var tutorial = {
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
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
    });
};

// Retrieve all data
exports.findAll = (req, res) => {
    var title = req.query.title;
    var condition = title ? {title: { [Op.like]: '%${title}%' } } : null;

    Sql.findAll({ wjere: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving tutorials."
        });
    });

};

// Find a single row with id
exports.findOne = (req, res) =>{
    const id = req.params.id;

    Sql.findByPk(id)
    .then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Tutorial with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
        });
    });
};

// Update an existing row
exports.update = (req, res) =>{
    const id = req.param.id;

    Sql.update(req.body, {
        where: {id: id }
    })
        .then(num => {
            if( num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id =" + id
            });
        });
};

// Delete a single row by id
exports.delete = (req, res) =>{
    const id = req.params.id;

    Sql.destroy({
        where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all the data from db
exports.deleteAll = (req, res) =>{
    Sql.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Tutorials were delted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all tutorials."
        });
    });

};

// I'm not sure
exports.findAllPublished = (req, res) =>{
    Sql.findAll({ where: {published: true} })
     .then(data => {
         res.send(data);
     })
     .catch(err => {
         res.status(500).send({
             message:
                err.message || "Some error occurred while retrieving tutorials."
         });
     });
};