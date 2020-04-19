var db_connection = require('../database/database_connection');
var express = require('express');
var router = express.Router();

//get all orders
router.get('/orders', (request, response, next) => {
    db_connection.query('SELECT * FROM orders', (error, result) => {
        if (error) {
            return response.status(401).json('Issues returning order records');
        }
        response.status(200).json(result.rows);
    });
});

//Add new order detail
router.post('/orders/add', (request, response, next) => {
    const {
        buyerid,
        sellerid,
        orderdate
    } = request.body;
    db_connection.query('INSERT INTO orders (buyerid,sellerid,orderdate) VALUES($1,$2,$3)',
        [buyerid, sellerid, orderdate], (error, result) => {
            if (error) {
                console.log("BuyerID: "+ buyerid + "SellerID: "+ sellerid + "orderdate: "+ orderdate);
                console.log(error);
                return response.status(401).json('order failed to be added');
            }
            response.status(200).json("Successfully added a order");
        });
});
//update order detail
router.put('/orders/update', (request, response, next) => {
    const {
        orderid,
        buyerid,
        sellerid,
        orderdate
    } = request.body;

    db_connection.query("UPDATE orders SET buyerid=$1, sellerid=$2, orderdate=$3 WHERE orderid =$4",
        [buyerid, sellerid, orderdate, orderid], (error, result) => {
            if (error) {
                return response.status(401).json('order failed to update');
            }
            response.status(200).json('Successfully updated the order');
        });

});
//delete order detail
router.delete('/orders/delete', (request, response, next) => {
    const {
        orderid
    } = request.body;
    db_connection.query("DELETE FROM orders WHERE orderid=$1", [orderid], (error, result) => {
        if (error) {
            return response.status(401).json('order failed to delete');

        }
        response.status(200).json("Successfully deleted order detail");
    });
});

router.get('/orders/lastRecord', (request, response, next) => {
    db_connection.query("SELECT orderid FROM orders ORDER BY orderid DESC LIMIT 1", (error, result) => {
        if (error) {
           return response.status(401).json("Error no records");
        }
    
        return response.status(200).json(result.rows);
    });
});

module.exports = router;