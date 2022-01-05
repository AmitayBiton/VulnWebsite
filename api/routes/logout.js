var express = require("express");
var router = express.Router();


router.get("/", (req, res) => {
    console.log(req.session.cookie);
    console.log(req.session.id);
    req.session.destroy(() => {
        res.status(200).send("logout Succeeded!");
    });
  });

  
module.exports = router;