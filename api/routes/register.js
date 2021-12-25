const e = require('express');
var express = require('express');
var router = express.Router();
var databaseConnection = require("../handlers/db");
const passwordComplexity = require("joi-password-complexity");
const PWD_CONFIG = require("../config/pwd.config");

router.post('/', (req, res) => {
    // TODO: implement sql query to Database, hashing password and check if password hash equal to database
    
    if(req.body.username && req.body.password && req.body.emailAddress && req.body.firstName && req.body.lastName){
        //input validation:
        // password validation:
        var passwordValidation = passwordComplexity(PWD_CONFIG).validate(req.body.password)
        if(passwordValidation.hasOwnProperty('error')){
            var validationMessage = passwordValidation.error.details[0].message
            res.status(400).send(`ValidationErr: ${validationMessage}`)
        } else{
            // isExist validation:
            databaseConnection.query(`SELECT emailAddress FROM users WHERE username = '${req.body.username}'`, function (err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    //all valid !
                    // hasing password:
                    var passwordHash = hashPassword(req.body.password)

                    //db insersion:
                    databaseConnection.query(`INSERT INTO vulnwebsitedb.users(userName,passwordHash,lastName,firstName,emailAddress)
                    VALUES ('${req.body.username}','${passwordHash}','${req.body.lastName}','${req.body.firstName}','${req.body.emailAddress}')`, function (err, result) {
                        if (err) throw err;
                        res.status(200).send(`{"customerID": ${result.insertId}}`);
                    });
                }
                else{
                    res.status(400).send(`the user '${req.body.username}' is already exists`);
                }
            });
        }        
    } else{
        res.send("One or more parameters are not provided. Required parameters:'username','password','emailAddress'");
    }
    
  });

module.exports = router;

function hashPassword(clearPassword){
    return clearPassword
}