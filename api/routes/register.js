const express = require('express');
var router = express.Router();
var databaseConnection = require("../handlers/db");
const passwordDictionary = require("secure-password-validator");
const PWD_CONFIG = require("../config/pwd.config");
const PWDTool = require("../vars/passwords");


router.post('/', (req, res) => {
    if(req.body.username && req.body.password && req.body.emailAddress && req.body.firstName && req.body.lastName){
        results = databaseConnection.query(`SELECT userName FROM users WHERE userName = '${req.body.username}'`)
        if(results.length == 0){
            // password validation:
            var passwordValidation = passwordDictionary.validate(req.body.password,PWD_CONFIG)
            if(passwordValidation.valid === false){
                console.log(passwordValidation.errors[0])
                var validationMessage = passwordValidation.errors
                res.status(400).send(`ValidationErr: ${validationMessage}`)
            }else{
                var passRes = PWDTool.calculateHmacAndSalt(req.body.password)
                var passwordHash = passRes.hmac
                var passwordSalt = passRes.salt
                PWDTool.archivePassword(req.body.username,passwordHash,passwordSalt)
                //DB insersion:
                // aaaaa' ; DROP TABLE customers; -- 
                // aaa' or 1=1 -- 
                // aaa' ; SELECT * FROM users -- 
                var results = databaseConnection.query(`INSERT INTO vulnwebsitedb.users(userName,passwordHash,passwordSalt,lastName,firstName,emailAddress)
                    VALUES ('${req.body.username}','${passwordHash}','${passwordSalt}','${req.body.lastName}','${req.body.firstName}','${req.body.emailAddress}')`)
                res.status(200).send(`{"userID": ${results.insertId}}`);
            }
        }else{
            
            res.status(400).send(`the user '${req.body.username}' is already exists` + JSON.stringify(results));
        }
    } else{
        res.status(400).send("One or more parameters are not provided. Required parameters:'username','password','emailAddress'");
    }
  });

module.exports = router;


