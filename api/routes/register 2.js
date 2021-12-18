var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    // Insert Register Code Here
    // TODO: implement sql query to Database, hashing password and check if password hash equal to database
    if(req.body.username && req.body.password && req.body.emailAddress){
        let username = req.body.username;
        let password = req.body.password;
        let emailAddress = req.body.emailAddress;
        
        //input validation:
        // TODO: create config file with password strength policy 
        
        // insert registration to SQL Table

    }else{
        res.send("One or more parameters are not provided. Required parameters:'username','password','emailAddress'");
    }
  });

module.exports = router;