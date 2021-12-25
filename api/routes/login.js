var express = require("express");
const PWDTool = require("../vars/passwords");
var router = express.Router();
var databaseConnection = require('../handlers/db')



router.post("/", (req, res) => {
  if (req.body.username && req.body.password) {
    // console.log(req.session);
    results = databaseConnection.query(`SELECT passwordHash,passwordSalt FROM users WHERE userName = '${req.body.username}'`)
    if (results.length != 1){
      res.status(401).send("Incorrect Username or Password")
    } else {
      // password validation:
      var passwordHash = results[0].passwordHash
      var passwordSalt = results[0].passwordSalt
      if(PWDTool.validatePassword(req.body.password,passwordHash,passwordSalt)) {
        res.status(200).send("loggin Succeeded!");
        //req.session.user=req.body.username;
        console.log(req.session);

      } else{
        res.status(401).send("Incorrect Username or Password")
      }
    }
  } else {
    res.status(400).send(
      "One or more parameters are not provided. Required parameters:'username','password'"
    );
  }
});


// router.get("/", (req, res) => {
//   if(req.session.user) {
//     res.send({loggedIn: true, user: req.session.user});
//   } else {
//     console.log(req.session.user);
//     res.send({loggedIn: false});
//   }
// });

module.exports = router;
