var express = require('express');
var router = express.Router();
const mailTansporter = require("../transporters/mailTransporter")
const PWDTool = require("../vars/passwords");


router.get('/', function(req, res, next) {
    //mailTansporter.notify("amitaybiton@gmail.com","this is a test message from NodeJS","Test From NodeJS")

    console.log(PWDTool.isPendingPasswordReset("admin"))
    res.send('API is working properly');
});

module.exports = router;