//get the database connection
var express = require("express");
var router = express.Router();
var db_connection = require("../database/database_connection");

//----------------------------------------
//get all products
router.get("/products", (request, response, next) => {
  db_connection.query("SELECT * FROM products", (error, results) => {
    if (error) {
      return response.status(404).json('Products not found');
    }
      return response.status(200).json(results.rows);
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
        return  response.status(404).json('product not found');
      }
      //return the single product
       return response.status(200).json(results.rows);

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
    description,
    quantity,
    image
  } = request.body;

  //insert statement to add products to the database
  db_connection.query(
    "INSERT INTO products (productname,categoryid,sellerid,price,description,quantity,image) VALUES($1,$2,$3,$4,$5,$6,$7)",
    [productname, categoryid, sellerid, price, description, quantity, image],
    (error, results) => {
      if (error) {
        //respond with an error if the insertion has failed.
        //Response.status(404).send('The product is missing details and could not be added');
        return response.status(404).json('Product cannot be added ' + error.message);
      }
      //send a success full response to the client.
      return response.status(200).json("Product added successfully");
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
    description,
    quantity
  } = request.body;
  db_connection.query(
    "UPDATE products SET productname = $1, categoryid = $2, sellerid=$3, price=$4, description = $5, quantity = $6 WHERE productid = $7",
    [productname, categoryid, sellerid, price, description, quantity, productid],
    (error, results) => {
      if (error) {
        return response.status(401).json('Updating product has failed');
      }
      return response.status(200).json(`Product modified with ID: ${productid}`);
    }
  );
});

router.delete("/products/delete", (request, response, next) => {
  const {
    productid
  } = request.body;

  db_connection.query(
    "DELETE FROM products WHERE productid = $1",
    [productid],
    (error, results) => {
      if (error) {
        return response.status(401).json('Product failed to be deleted');
      }
      return  response.status(200).json(`Product was deleted with ID: ${productid}`);
    }
  );
});

//get products by 
router.get('/getAllProductsByCategory/:id', (request, response) =>{
  const id = parseInt(request.params.id);

    db_connection.query('SELECT * FROM products WHERE categoryid =$1',
      [id], (error,results) =>{
        if(error){
          return response.status(404).json('No product with the provided category');
        }
          return response.status(200).json(results.rows);
      }
    )
});
module.exports = router;