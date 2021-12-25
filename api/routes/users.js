var express = require('express');
var router = express.Router();
var databaseConnection = require('../handlers/db')

router.get('/', function(req, res) {
  databaseConnection.query('SELECT * FROM users', function (err, result) {
    if (err) throw err;      
    res.send(result);
  });
});

router.get('/:userId', function(req, res) {
  databaseConnection.query(`SELECT userID,username,lastName,firstName,emailAddress FROM users WHERE userID = '${req.params.userId}'`, function (err, result) {
    //' or 1=1 '
    if (err) throw err;      
    res.send(result);
  });
});

router.put('/:userId', function(req, res) {
  res.send(`userid = ${req.params.userId}`)
});

module.exports = router;
