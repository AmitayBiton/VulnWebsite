var express = require("express");
var router = express.Router();
var databaseConnection = require("../handlers/db");

/* GET users listing. */
router.get("/", function (req, res) {
  databaseConnection.query("SELECT * FROM customers", function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.sendStatus(404);
    } else {
      res.send(result);
    }
  });
});

router.get("/:customerId", function (req, res) {
  databaseConnection.query(
    `SELECT * FROM customers WHERE customerID = '${req.params.customerId}'`,
    function (err, result) {
      //' or 1=1 '
      if (err) throw err;
      console.log(result.length);
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/", function (req, res) {
  // TODO: input validation for all params
  if (
    req.body.lastName &&
    req.body.firstName &&
    req.body.emailAddress &&
    req.body.phoneNumber &&
    req.body.userName &&
    req.body.password
  ) {
    var SQLQuery = `INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber,userName,password) VALUES ('${req.body.lastName}','${req.body.firstName}','${req.body.emailAddress}','${req.body.phoneNumber}','${req.body.userName}','${req.body.password}')`;
    databaseConnection.query(SQLQuery, function (err, result) {
      if (err) throw err;
      res.send(`{"customerID": ${result.insertId}}`);
    });
  }
});

module.exports = router;
