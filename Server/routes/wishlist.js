var db_connection = require('../database/database_connection');
var express = require('express');
var router = express.Router();

//get a purchase history for a single user
router.get('/wishlist', (request, response, next) => {
    db_connection.query('SELECT * FROM wishlist', (error, result) => {
        if (error) {
            return response.status(401).json('No WishList exist ');
        }
            return response.status(200).json(result.rows);
    });
});


//check if a product is on the wishlist
router.post('/check_wishlist', (request,response) =>{
    const {accountid, productid} = request.body;
    db_connection.query('SELECT * FROM wishlist WHERE accountid=$1 AND productid=$2',
    [accountid,productid],
    (error,result) =>{
        if(error){
            return response.status(404).json("Err getting the item");
        }
        if(result.rows.length > 0) {
            return response.status(301).json("product is already on the wishlist");
        }
        else{
            return response.status(200).json("Product is not on the wishlist");
        }
    })
})





router.get('/wishlist/:id', (request, response, next) => {
    const id = parseInt(request.params.id)
    db_connection.query("SELECT * FROM wishlist WHERE wishlistid = $1", [id], (error, result) => {
        if (error) {
            return response.status(401).json('Wishlist with id: ' + id + 'Does not exist');
        }
            return response.status(200).json(result.rows);
    });
});

//add a purchase history
router.post('/wishlist/add', (request, response, next) => {
    const {
        accountid,
        productid
    } = request.body;

    db_connection.query('INSERT INTO wishlist (accountid, productid) VALUES($1,$2)', 
    [accountid, productid],
     (error, result) => {
        if (error) {
            return response.status(401).json('Errors received while attempting to add a WishList record ');
        }
            return response.status(200).json('Successfully added to purchase history');
    });
});

//update purchas history
router.put('/wishlist/update', (request, response, next) => {
    const {
        accountid,
        productid
    } = request.body;

    db_connection.query('UPDATE wishlist SET accountid=$1, productid=$2', [accountid, productid], (error, result) => {
        if (error) {
            return response.status(401).json('Errors received while attempting to update a wishlist record ');
        }
            return response.status(200).json('Successfully updated shipping address');
    });
});

//delete purchase history
router.delete('/wishlist/delete', (request, response, next) => {
    const { wishlistid } = request.body;

console.log(wishlistid);

    db_connection.query('DELETE FROM wishlist WHERE wishlistid = $1',
     [wishlistid],
      (error, result) => {
        if (error) {
          return response.status(401).json('Errors received while attempting to delete a wishlist record ');
        }
    });
        return response.status(200).json('Successfully deleted wishlist item');
});




module.exports = router;