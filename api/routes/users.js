var express = require("express");
const mailTansporter = require("../transporters/mailTransporter");
var router = express.Router();
var databaseConnection = require("../handlers/db");
const PWDTool = require("../vars/passwords");
const PWD_HISTORY_CONFIG = require("../config/pwdHistory.config");
const crypto = require("crypto");

router.get("/", function (req, res) {
  results = databaseConnection.query(
    `SELECT userID,username,lastName,firstName,emailAddress FROM users`
  );
  res.status(200).send(results);
});

router.get("/:userId", function (req, res) {
  //' or 1=1 '
  results = databaseConnection.query(
    `SELECT userID,username,lastName,firstName,emailAddress FROM users WHERE userID = '${req.params.userId}'`
  );
  if (results.length != 0) {
    res.status(200).send(results);
  } else {
    res.status(404).send(`user not found`);
  }
});

router.post("/:userId/changePassword", function (req, res) {
  var results = databaseConnection.query(
    `SELECT userName FROM users WHERE userID = '${req.params.userId}' LIMIT 1`
  )[0];
  if (results.length != 0) {
    username = results[0].userName;
    if (!PWDTool.isComplexed(req.body.password)) {
      res.status(400).send(`not complexed`);
    } else if (!PWDTool.isPasswordUsed(username, req.body.password)) {
      res
        .status(400)
        .send(
          `password been used already. password retention set to ${PWD_HISTORY_CONFIG.history}`
        );
    } else {
      //all valid
      PWDTool.changePassword(username, req.body.password);
      res.status(200).send(`Password changed successfully!`);
    }
  } else {
    res.status(404).send(`user not found`);
  }
});

router.post("/:userId/forgetPassword", function (req, res) {
  var userData = databaseConnection.query(
    `SELECT userName,emailAddress FROM users WHERE userID = '${req.params.userId}' LIMIT 1`
  )[0];
  if (userData.length != 0) {
    if (!PWDTool.isPendingPasswordReset(userData.userName)) {
      var pincode = crypto.randomBytes(5).toString("hex");
      var passRes = PWDTool.calculateHmacAndSalt(pincode);
      var pincodeHash = passRes.hmac;
      var pincodeSalt = passRes.salt;
      databaseConnection.query(
        `INSERT INTO vulnwebsitedb.forgetPassword(userName,pincodeHash,pincodeSalt) VALUES ('${userData.userName}','${pincodeHash}','${pincodeSalt}')`
      );
      res
        .status(200)
        .send(`reset password pending for user ${userData.userName}`);
      mailTansporter.notify(
        `${userData.emailAddress}`,
        `your pincode is: ${pincode}`,
        "VulnWebsite - Pincode for reset password"
      );
    } else {
      res.status(400).send(`user is already pending password reset`);
    }
  } else {
    res.status(404).send(`user not found`);
  }
});

router.post("/:userId/changeForgottenPassword", function (req, res) {
  var userData = databaseConnection.query(
    `SELECT userName FROM users WHERE userID = '${req.params.userId}' LIMIT 1`
  );
  if (userData.length != 0) {
    var username = userData[0].userName;
    if (req.body.password && req.body.pincode) {
      //validation of params:
      if (PWDTool.isPendingPasswordReset(username)) {
        var pendingData = databaseConnection.query(
          `SELECT pincodeHash,pincodeSalt FROM vulnwebsitedb.forgetPassword WHERE userName = '${username}'`
        )[0];
        if (
          PWDTool.validatePassword(
            req.body.pincode,
            pendingData.pincodeHash,
            pendingData.pincodeSalt
          )
        ) {
          //validating pincode:
          if (!PWDTool.isComplexed(req.body.password)) {
            //checking password complexity:
            res.status(400).send(`not complexed`);
          } else if (!PWDTool.isPasswordUsed(username, req.body.password)) {
            //checking password history
            res
              .status(400)
              .send(
                `password been used already. password retention set to ${PWD_HISTORY_CONFIG.history}`
              );
          } else {
            //all valid, changing password
            PWDTool.changePassword(username, req.body.password);
            databaseConnection.query(
              `DELETE FROM vulnwebsitedb.forgetPassword WHERE userName = '${username}'`
            );
            res.status(200).send(`Password changed successfully!`);
          }
        } else {
          res.status(403).send(`pincode is incorrect`);
        }
      } else {
        res.status(400).send(`user is not pending password reset`);
      }
    } else {
      res
        .status(400)
        .send(
          "One or more parameters are not provided. Required parameters:'password','pincode'"
        );
    }
  } else {
    res.status(404).send(`user not found`);
  }
});

module.exports = router;
