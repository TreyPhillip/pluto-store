//get all payments
//get a payment option
//add a payment method
//Encrypt the credit card number (Add, Update)
//update a payment method
//delete a payment method
//middleware routing
var express = require('express');
var router = express.Router();

//encryption package
const bcrypt = require('bcrypt');
//encryption strength -- 2^n (n = saltcount)
const saltCount = 10;
//get the database connection
const db_connection = require('../database/database_connection');

router.get('/payment', (request, response, next) => {
    db_connection.query('SELECT * FROM payment', (error, result) => {
        if (error) {
            return response.status(401).json('No payments exist');
        }
        response.status(200).json(result.rows);
    });
});
router.get('/payment/:id', (request, response, next) => {
    const id = parseInt(request.params.id);
    db_connection.query('SELECT * FROM payment WHERE paymentid=$1', [id],
        (error, result) => {
            if (error) {
                return response.status(401).json('A payment does not exist with that id');
            }
                return response.status(200).json(result.rows);
        });
});

router.post('/payment/validateCreditNumber', (request, response) =>{
    const {creditcardnumber} = request.body;

    db_connection.query("SELECT exists(select 1 from payment where creditcardNumber=$1)", [creditcardnumber], (error, result) =>{
        if(error){
            return response.status(404).json('Error finding Credit Card Number');
        }
        console.log(result.rows[0].exists);
        if(result.rows[0].exists === true){
            return response.status(404).json("Credit Card is registered already ");
        }
        else
        {
           return response.status(200).json("The credit card is not taken");
        }
    });
})


//Add a new account
router.post('/payment/add', (request, response, next) => {
    const {
        accountid,
        creditcardnumber,
        cardholdername,
        expirationdate,
        cvcode
    } = request.body;

    db_connection.query('INSERT INTO payment (accountid,creditcardnumber,cardholdername,expirationdate,cvcode) VALUES ($1,$2,$3,$4,$5)',
        [accountid, creditcardnumber, cardholdername, expirationdate, cvcode], (error, result) => {
            if (error) {
                return response.status(401).json('payment failed to be added');
            }
        });
                return response.status(200).send('Payment has been successfully added');
});
//update an account
router.put('/payment/update', (request, response, next) => {
    const {
        paymentid,
        accountid,
        creditcardnumber,
        cardholdername,
        expirationdate,
        cvcode
    } = request.body;
    //encrypt the replacement password

    db_connection.query('UPDATE payment SET accountid =$1,creditcardnumber=$2, cardholdername=$3,expirationdate=$4,cvcode=$5 WHERE paymentid=$6',
        [accountid, creditcardnumber, cardholdername, expirationdate, cvcode, paymentid], (error, result) => {
            if (error) {
                return response.status(401).json('payment failed to update');
            }
        });
                return response.status(200).send('payment information has been updated');
});

//delete an account
router.delete('/payment/delete', (request, response, next) => {
    const {
        paymentid
    } = request.body;
    db_connection.query('DELETE from payment WHERE paymentid = $1', [paymentid], (error, result) => {
        if (error) {
            return response.status(401).json('payment failed to be deleted');
        }
    });
            return response.status(200).send('Payment has been deleted');
});

module.exports = router;