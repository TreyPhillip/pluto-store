var db_connection = require("../database/database_connection");
var express = require("express");
var router = express.Router();
//orderdetailid, productid, orderid, quantity,peritemprice

//get all orders
router.get("/order/detail", (request, response, next) => {
  db_connection.query("SELECT * FROM orderdetail", (error, result) => {
    if (error) {
      return response.status(401).json('Error returning the orders details')
    }
      return response.status(200).json(result.rows);
  });
});
//get an order detail by id
router.get("/order/detail/:id", (request, response, next) => {
  const id = parseInt(request.params.id);
  db_connection.query(
    "SELECT * FROM orderdetail WHERE orderdetailid=$1",
    [id],
    (error, result) => {
      if (error) {
        return response.status(401).json('order does not exist')
      }
        return response.status(200).json(result.rows);
    }
  );
});

//Add new order detail
router.post("/order/detail/add", (request, response, next) => {
  const {
    productid,
    orderid,
    quantity,
    peritemprice
  } = request.body;
  db_connection.query(
    "INSERT INTO orderdetail (productid, orderid, quantity, peritemprice) VALUES($1,$2,$3,$4)",
    [productid, orderid, quantity, peritemprice],
    (error, result) => {
      if (error) {
        return response.status(401).json('Adding Order detail failed');
      }
        return response.status(200).json("Successfully added a order detail");
    }
  );
});

//update order detail
router.put("/order/detail/update", (request, response, next) => {
  const {
    productid,
    orderid,
    quantity,
    peritemprice,
    orderdetailid
  } = request.body;
  db_connection.query(
    "UPDATE orderdetail SET productid=$1, orderid=$2, quantity=$3, peritemprice=$4 WHERE orderdetailid =$5",
    [productid, orderid, quantity, peritemprice, orderdetailid],
    (error, result) => {
      if (error) {
        return response.status(401).json('Update Order detail failed');
      }
        return response.status(200).json("Successfully updated orderdetail");
    }
  );
});
//delete order detail
router.delete("/order/detail/delete", (request, response, next) => {
  const {
    orderdetailid
  } = request.body;
  db_connection.query(
    "DELETE FROM orderdetail WHERE orderdetailid=$1",
    [orderdetailid],
    (error, result) => {
      if (error) {
        return response.status(401).json('Failed to delete the order detail');
      }
        return  response.status(200).json("Successfully delete order detail");
    }
  );
});

module.exports = router;