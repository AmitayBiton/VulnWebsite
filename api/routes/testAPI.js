var express = require('express');
var router = express.Router();
const PWDTool = require("../vars/passwords");


router.get('/', function(req, res, next) {
    console.log(PWDTool.validatePasswordHistory("admin","Password3!"))
    console.log(PWDTool.validatePasswordHistory("admin","Passworw3!"))
    
    
    res.send('API is working properly');
});

module.exports = router;