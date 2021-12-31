const e = require('express');
var express = require('express');
var router = express.Router();
var databaseConnection = require("../handlers/db");
const passwordComplexity = require("joi-password-complexity");
const PWD_CONFIG = require("../config/pwd.config");
const PWDTool = require("../vars/passwords");


router.post('/', (req, res) => {
    //TODO: 1. changePassword, complexity - password history    
    if(req.body.username && req.body.password && req.body.emailAddress && req.body.firstName && req.body.lastName){
        //input validation:
        
        // isExist validation:
        results = databaseConnection.query(`SELECT userName FROM users WHERE userName = '${req.body.username}'`)
        if(results.length == 0){
            // password validation:
            var passwordValidation = passwordComplexity(PWD_CONFIG).validate(req.body.password)
            if(passwordValidation.hasOwnProperty('error')){
                var validationMessage = passwordValidation.error.details[0].message
                res.status(400).send(`ValidationErr: ${validationMessage}`)
            }else{
                var passRes = PWDTool.calculateHmacAndSalt(req.body.password)
                var passwordHash = passRes.hmac
                var passwordSalt = passRes.salt
                PWDTool.archivePassword(req.body.username,passwordHash,passwordSalt)
                //DB insersion:
                var results = databaseConnection.query(`INSERT INTO vulnwebsitedb.users(userName,passwordHash,passwordSalt,lastName,firstName,emailAddress)
                    VALUES ('${req.body.username}','${passwordHash}','${passwordSalt}','${req.body.lastName}','${req.body.firstName}','${req.body.emailAddress}')`)
                res.status(200).send(`{"customerID": ${results.insertId}}`);
            }
        }else{
            res.status(400).send(`the user '${req.body.username}' is already exists`);
        }
    } else{
        res.send("One or more parameters are not provided. Required parameters:'username','password','emailAddress'");
    }
    
  });

module.exports = router;


