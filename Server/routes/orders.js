var db_connection = require('../database/database_connection');
var express =require('express');
var router = express.Router();
//orderdetailid, productid, orderid, quantity,peritemprice

//get all orders
router.get('/orders',(request, response, next) =>{
    db_connection.query('SELECT * FROM orders', (error, result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json(result.rows);
    });
});
//get an order detail by id
router.get('/orders/:id',(request, response,next) =>{
    const id = parseInt(request.params.id)
    db_connection.query('SELECT * FROM orders WHERE orderid=$1',[id],(error, result)=>{
        if(error){
            return next(error);
        }
        response.status(200).json(result.rows);
    });
});
//Add new order detail
router.post('/orders/add',(request, response, next) =>{
    const{buyerid,sellerid, orderdate} = request.body;
    db_connection.query('INSERT INTO orders (buyerid,sellerid,orderdate) VALUES($1,$2,$3)',
    [buyerid,sellerid,orderdate], (error, result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json("Successfully added a order detail");
    });
});
//update order detail
router.put('/orders/update', (request, response, next) =>{
    const{orderid,buyerid,sellerid, orderdate} = request.body;

    db_connection.query("UPDATE orders SET buyerid=$1, sellerid=$2, orderdate=$3 WHERE orderid =$4",
    [buyerid,sellerid,orderdate,orderid], (error, result) =>{
        if(error){
            return next(error)
        }
        response.status(200).json('Successfully updated orderdetail');
    });

});
//delete order detail
router.delete('/orders/delete', (request, response, next)=>{
    const{orderid} = request.body;
    db_connection.query("DELETE FROM orders WHERE orderid=$1",[orderid], (error, result)=>{
        if(error){
            return next(error);
        }
        response.status(200).json("Successfully delete order detail");
    });
});

module.exports = router;