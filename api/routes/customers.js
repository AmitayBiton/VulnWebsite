var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  // TODO: query all customers from SQL to JSON and send as response
  res.send(`all users`);
});

router.get('/:customerId', function(req, res) {
  // TODO: query sepcified customer from SQL to JSON and send as response
  res.send(`customerId = ${req.params.customerId}`)
});

router.post('/', function(req, res) {
    // TODO: input validation for all params
    
    // TODO: add new object to customers sql table
    res.send(`customerId`)
});

module.exports = router;