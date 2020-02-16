var db_connection = require("../database/database_connection");
var express = require("express");
var router = express.Router();

//get a purchase history for a single user
router.get("/shippingaddress", (request, response, next) => {
  db_connection.query("SELECT * FROM shippingaddress", (error, result) => {
    if (error) {
      return next(error);
    }
    response.status(200).json(result.rows);
  });
});

router.get("/shippingaddress/:id", (request, response, next) => {
  const id = parseInt(request.params.id);
  db_connection.query(
    "SELECT * FROM shippingaddress WHERE shippingaddressid=$1",
    [id],
    (error, result) => {
      if (error) {
        return next(error);
      }
      response.status(200).json(result.rows);
    }
  );
});

//add a purchase history
router.post("/shippingaddress/add", (request, response, next) => {
  const {
    accountid,
    firstname,
    lastname,
    streetaddress,
    city,
    country
  } = request.body;

  db_connection.query(
    "INSERT INTO shippingaddress (accountid,firstname,lastname,streetaddress,city,country) VALUES($1,$2,$3,$4,$5,$6)",
    [accountid, firstname, lastname, streetaddress, city, country],
    (error, result) => {
      if (error) {
        return next(error);
      }
      response.status(200).json("Successfully added to purchase history");
    }
  );
});

//update purchas history
router.put("/shippingaddress/update", (request, response, next) => {
  const {
    shippingaddressid,
    accountid,
    firstname,
    lastname,
    streetaddress,
    city,
    country
  } = request.body;

  db_connection.query(
    "UPDATE shippingaddress SET accountid=$1,firstname=$2,lastname=$3,streetaddress=$4, city=$5, country=$6 WHERE shippingaddressid=$7",
    [
      accountid,
      firstname,
      lastname,
      streetaddress,
      city,
      country,
      shippingaddressid
    ],
    (error, result) => {
      if (error) {
        return next(error);
      }
      response.status(200).json("Successfully updated shipping address");
    }
  );
});

//delete purchase history
router.delete("/shippingaddress/delete", (request, response, next) => {
  const { shippingaddressid } = request.body;
  db_connection.query(
    "DELETE FROM shippingaddress WHERE shippingaddressid = $1",
    [shippingaddressid],
    (error, result) => {
      if (error) {
        return next(error);
      }
      response.status(200).json("Successfully delete shipping address");
    }
  );
});

module.exports = router;
