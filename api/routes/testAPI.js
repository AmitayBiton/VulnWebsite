var express = require('express');
var router = express.Router();
const mailTansporter = require("../transporters/mailTransporter")


router.get('/', function(req, res, next) {
    mailTansporter.notify("amitaybiton@gmail.com","this is a test message from NodeJS","Test From NodeJS")
    res.send('API is working properly');
});

module.exports = router;