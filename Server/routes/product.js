//get the database connection
var express = require("express");
var router = express.Router();
var db_connection = require("../database/database_connection");

//get all products
router.get("/products", (request, response, next) => {
  db_connection.query("SELECT * FROM products", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

//get a product by Id
router.get("/products/:id", (request, response, next) => {
  const id = parseInt(request.params.id);
  db_connection.query(
    "SELECT * FROM products WHERE productid=$1",
    [id],
    (error, results) => {
      if (error) {
        //return an error message stating there are no products
        return next(error);
      }
      //return the single product
      response.status(200).json(results.rows);
    }
  );
});

//add a product
router.post("/products/add", (request, response, next) => {
  //values that are expected within the request body.
  const {
    productname,
    categoryid,
    sellerid,
    price,
    description
  } = request.body;
  //insert statement to add products to the database
  db_connection.query(
    "INSERT INTO products (productname,categoryid,sellerid,price,description) VALUES($1,$2,$3,$4,$5)",
    [productname, categoryid, sellerid, price, description],
    (error, results) => {
      if (error) {
        //respond with an error if the insertion has failed.
        //Response.status(404).send('The product is missing details and could not be added');
        return next(error);
      }
      //send a success full response to the client.
      response.status(200).send("Product added successfull added");
    }
  );
});

//update a product
router.put("/products/update", (request, response, next) => {
  const {
    productid,
    productname,
    categoryid,
    sellerid,
    price,
    description
  } = request.body;
  db_connection.query(
    "UPDATE products SET productname = $1, categoryid = $2, sellerid=$3, price=$4, description = $5 WHERE productid = $6",
    [productname, categoryid, sellerid, price, description, productid],
    (error, results) => {
      if (error) {
        return next(error);
      }
      response.status(200).send(`Product modified with ID: ${productid}`);
    }
  );
});

router.delete("/products/delete", (request, response, next) => {
  const { productid } = request.body;

  db_connection.query(
    "DELETE FROM products WHERE productid = $1",
    [productid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Product was deleted with ID: ${productid}`);
    }
  );
});

module.exports = router;
