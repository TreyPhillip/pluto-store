var db_connection = require('../database/database_connection');
var express = require('express');
var router = express.Router();

//get a purchase history for a single user
router.get('/purchasehistory', (request, response, next) => {
    db_connection.query('SELECT * FROM purchasehistory', (error, result) => {
        if (error) {
            return response.status(401).json('No purchase history exist');
        }
        response.status(200).json(result.rows);
    });
});

router.get('/purchasehistory/:id', (request, response, next) => {
    const id = parseInt(request.params.id)
    db_connection.query("SELECT * FROM purchasehistory WHERE historyid = $1", [id], (error, result) => {
        if (error) {
            return response.status(401).json('No purchase history exist with an id:' + id);
        }
        response.status(200).json(result.rows);
    });
});

//add a purchase history
router.post('/purchasehistory/add', (request, response, next) => {
    const {
        buyerid,
        sellerid,
        shippingaddressid,
        productid,
        datepurchased,
        productprice,
        quantity
    } = request.body;
    db_connection.query('INSERT INTO purchasehistory (buyerid, sellerid, shippingaddressid,productid,datepurchased,productprice,quantity) VALUES($1,$2,$3,$4,$5,$6,$7)',
        [buyerid, sellerid, shippingaddressid, productid, datepurchased, productprice, quantity], (error, result) => {
            if (error) {
                return response.status(401).json('Errors received while attempting to add a purchase history record ');
            }
            response.status(200).json('Successfully added to purchase history');
        });
});

//update purchas history
router.put('/purchasehistory/update', (request, response, next) => {
    const {
        buyerid,
        sellerid,
        shippingaddressid,
        productid,
        datepurchased,
        productprice,
        quantity
    } = request.body;

    db_connection.query('UPDATE purchasehistory SET buyerid=$1, sellerid=$2, shippingaddressid=$3,productid=$4,datepurchased=$5,productprice=$6,quantity=$7', [buyerid, sellerid, shippingaddressid, productid, datepurchased, productprice, quantity], (error, result) => {
        if (error) {
            return response.status(401).json('Errors received while attempting to updated a purchase history record ');
        }
        response.status(200).json('Successfully update purchase history');
    });
});

//delete purchase history
router.delete('/purchasehistory/delete', (request, response, next) => {
    const {
        historyid
    } = request.body;
    db_connection.query('DELETE FROM purchasehistory WHERE historyid = $1', [historyid], (error, result) => {
        if (error) {
            return response.status(401).json('Errors received while attempting to delete a purchase history record ');
        }
        response.status(200).json('Successfully update purchase history');
    });
});

module.exports = router;