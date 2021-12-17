var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  // TODO: query all users from SQL to JSON and send as response
  res.send(`all users`);
});

router.get('/:userId', function(req, res) {
  // TODO: query all users from SQL to JSON and send as response
  res.send(`userid = ${req.params.userId}`)
});


module.exports = router;
