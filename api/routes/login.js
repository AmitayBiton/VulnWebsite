var express = require("express");
const PWDTool = require("../vars/passwords");
var ExpressBrute = require('express-brute');
var router = express.Router();
var databaseConnection = require("../handlers/db");
var moment = require('moment');

var store = new ExpressBrute.MemoryStore();
const failCallback = (req, res, next, nextValidRequestDate) => {
  res.status(429).send("You've made too many failed attempts in a short period of time, please try again "+moment(nextValidRequestDate).fromNow());
};
const handleStoreError = (error) => {
	log.error(error); 
	throw {
		message: error.message,
		parent: error.parent
	};
};

const userBruteForce = new ExpressBrute(store, {
  freeRetries: 2,
  attachResetToRequest: false,
  refreshTimeoutOnRequest: false,
  minWait: 5*60*1000,
  maxWait: 5*60*1000,
  lifetime: 5*60*1000,
  failCallback: failCallback,
  handleStoreError: handleStoreError
});


router.post("/", userBruteForce.getMiddleware({
  key: (req,res, next) =>{
    next(req.body.username);
  }
}) ,(req, res) => {
  if (req.body.username && req.body.password) {
    // console.log(req.session);
    // aaaaa' ; DROP TABLE customers; -- 
    results = databaseConnection.query(
      `SELECT passwordHash,passwordSalt FROM users WHERE userName = '${req.body.username}'`
    );
    if (results.length != 1) {
      res.status(401).send("Incorrect Username or Password");
    } else {
      // password validation:
      var passwordHash = results[0].passwordHash;
      var passwordSalt = results[0].passwordSalt;
      if (
        PWDTool.validatePassword(req.body.password, passwordHash, passwordSalt)
      ) {
        req.session.IsLoggedin=true;
        res.status(200).send("loggin Succeeded!");
        //req.session.user=req.body.username;
        console.log(req.session);
      } else {
        res.status(401).send("Incorrect Username or Password");
      }
    }
  } else {
    res
      .status(400)
      .send(
        "One or more parameters are not provided. Required parameters:'username','password'"
      );
  }
});

router.get("/", (req, res) => {
  if (req.session.IsLoggedin) {
    res.send({ loggedIn: true });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
