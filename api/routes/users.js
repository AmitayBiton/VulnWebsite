var express = require('express');
var router = express.Router();
var databaseConnection = require('../handlers/db')



/* GET users listing. */
router.get('/', function(req, res) {
  databaseConnection.query('SELECT * FROM users', function (err, result) {
    if (err) throw err;      
    // console.log(result);
    res.send(result);
  });
});

router.get('/:userId', function(req, res) {
  databaseConnection.query(`SELECT * FROM users WHERE userID = '${req.params.userId}'`, function (err, result) {
    //' or 1=1 '
    if (err) throw err;      
    res.send(result);
  });
});

router.put('/:userId', function(req, res) {
  // TODO: query all users from SQL to JSON and send as response
  res.send(`userid = ${req.params.userId}`)
});

module.exports = router;
