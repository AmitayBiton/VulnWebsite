var express = require("express");
var router = express.Router();

router.post("/", (req, res) => {
  // Insert Login Code Here
  // TODO: implement SQL query to Database, hashing password and check if password hash equal to database
  if (req.body.username && req.body.password) {
    console.log("something");
    console.log(req.session);
    let username = req.body.username;
    let password = req.body.password;
    if (username == "admin" && password == "admin") {
      res.sendStatus(200);
      req.session.user=username;
      console.log(req.session);
    } else{
      res.sendStatus(401);
    }
    
  } else {
    res.send(
      "One or more parameters are not provided. Required parameters:'username','password'"
    );
  }
});


router.get("/", (req, res) => {
  if(req.session.user) {
    res.send({loggedIn: true, user: req.session.user});
  } else {
    console.log(req.session.user);
    res.send({loggedIn: false});
  }
});

module.exports = router;
