//middleware routing
var express = require("express");
var router = express.Router();

//encryption package
const bcrypt = require("bcrypt");
//encryption strength -- 2^n (n = saltcount)
const saltCount = 10;
//get the database connection
const db_connection = require("../database/database_connection");

router.get("/account", (request, response, next) => {
  const { emailaddress, userpassword } = request.body;
  db_connection.query(
    "SELECT * FROM account WHERE emailaddress = $1",
    [emailaddress],
    (error, result) => {
      //compare plaintext password with the stored hashed password
      bcrypt.compare(userpassword, result.rows[0].userpassword, function(
        err,
        res
      ) {
        if (res) {
          //if the result is true -- send the account object
          response.status(200).json(result.rows);
        } else {
          //else send invalid password/email
          response.status(500).json("Invalid password or email");
        }
      });
    }
  );
});

//Add a new account
router.post("/account/register", (request, response, next) => {
  const {
    username,
    emailaddress,
    userpassword,
    isverified,
    profileid
  } = request.body;
  //encrypt the password
  var hash = bcrypt.hashSync(userpassword, saltCount);
  console.log(hash);
  db_connection.query(
    "INSERT INTO account (username,userpassword,emailaddress,isverified,profileid) VALUES ($1,$2,$3,$4,$5)",
    [username, hash, emailaddress, isverified, profileid],
    (error, result) => {
      if (error) {
        return next(error);
      }
    }
  );
  response.status(200).send("Account has been registered successfully");
});

//update an account
router.put("/account/update", (request, response, next) => {
  const {
    username,
    userpassword,
    emailaddress,
    isverified,
    profileid
  } = request.body;
  //encrypt the replacement password
  var hashedPassword = bcrypt.hashSync(userpassword, saltCount);

  db_connection.query(
    "UPDATE account SET userpassword = $1, username = $2, isverified = $3, profileid=$4 WHERE emailaddress = $5",
    [hashedPassword, username, isverified, profileid, emailaddress],
    (error, result) => {
      if (error) {
        return next(error);
      }
    }
  );
  response.status(200).send("Account information has been updated");
});

//delete an account
router.delete("/account/delete", (request, response, next) => {
  const { accountid } = request.body;
  db_connection.query(
    "DELETE FROM account WHERE accountid = $1",
    [accountid],
    (error, result) => {
      if (error) {
        return next(error);
      }
    }
  );
  response.status(200).send("Account has been deleted");
});

module.exports = router;
