var express = require('express');
var router = express.Router();
var databaseConnection = require('../handlers/db')
const PWDTool = require("../vars/passwords");
const PWD_HISTORY_CONFIG = require("../config/pwdHistory.config");



router.get('/', function(req, res) {
  results = databaseConnection.query(`SELECT userID,username,lastName,firstName,emailAddress FROM users`)
  res.status(200).send(results)
});

router.get('/:userId', function(req, res) {
  //' or 1=1 '
  results = databaseConnection.query(`SELECT userID,username,lastName,firstName,emailAddress FROM users WHERE userID = '${req.params.userId}'`)
  res.status(200).send(results);  
});

router.put('/:userId/changePassword', function(req, res) {
  var username = databaseConnection.query(`SELECT username FROM users WHERE userID = '${req.params.userId}' LIMIT 1`)[0].username
  console.log(username)
  if(!PWDTool.isComplexed(req.body.password)){
    res.status(400).send(`not complexed`)
  }else if(!PWDTool.isPasswordUsed(username,req.body.password)){
    res.status(400).send(`password been used already. password retention set to ${PWD_HISTORY_CONFIG.history}`)
  }else{
    //all valid
    PWDTool.changePassword(username,req.body.password)
    res.status(200).send(`Password changed successfully!`)
  }
});

module.exports = router;
