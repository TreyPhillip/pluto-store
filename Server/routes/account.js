//middleware routing
var express = require("express");
var router = express.Router();

//used to sign tokens
const secert = 'security';
const jwt = require('jsonwebtoken');
//encryption package
const bcrypt = require("bcrypt");
//encryption strength -- 2^n (n = saltcount)
const saltCount = 10;
//get the database connection
const db_connection = require("../database/database_connection");

router.post("/authentication", (request, response, next) => {
  const { emailaddress, userpassword } = request.body;
  //check if the user has send an email or password
  db_connection.query("SELECT * FROM account WHERE emailaddress = $1",
    [emailaddress], (error, result) => {
      //compare plaintext password with the stored hashed password
      bcrypt.compare(userpassword, result.rows[0].userpassword, function( err,res) {
        if (res) {
          //CREATE A TOKEN -----------------------------------------------
          //what the payloads is sent within the token
          const payload = {emailaddress, accountid:result.rows[0].accountid};
          //signs the payload with the secert and sets the expiry date for 1 hour
          const token = jwt.sign(payload,secert,{
            expiresIn:'1h'
          });
          //send the token back to the frontned as a cookie
          response.status(200).json({sucess:true, token:`${token}`})
          //response.cookie('token', token,{httpOnly:true}).sendStatus(200);
        } else {
          //else send invalid password/email
          response.status(401).json("Invalid password or email");
          
        }
      });
    }
  );
});


//verify token======================================= check if a use has
router.post("/checkToken", (request,response, next) => {
  const {tokenString} = request.body; 

  //takes the token from the body, using the secert to decode the value
   jwt.verify(tokenString,secert, function(err,decoded){
    if(err){
        //if it doesn't validate, then the token is invalid.
          response.status(401).json('invaild token');
      }
      else{
         //check if the emails match.
          request.email = decoded.email;
         //send a message, status of 200 and the decoded object.
          response.status(200).json({
             message: 'Successfully valided',     
             //send back the decoded object.
             decoded
          });
        }
    });
});
///=======================================================




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
    "UPDATE account SET userpassword = $1, username = $2, isverified = $3, profileid = $4 WHERE emailaddress = $5",
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
