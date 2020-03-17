//database connection.
var db_connection = require('../database/database_connection');
//middleware
var express = require('express');
var router = express.Router();
//SELECT * FROM profile ORDER BY profileid DESC LIMIT 1

//get a profile
router.get('/profile', (request,response,next) =>{
    db_connection.query("SELECT * FROM profile", (error,result) =>{
        if(error){
            return next(error);
        }
        else{
            response.status(200).json(result.rows);
            return;
        }
    });
});
router.get('/profile/:id',(request,response,next) =>{
    const id = parseInt(request.params.id);

    db_connection.query('SELECT * FROM profile WHERE profileid=$1',[id],
     (error, result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json(result.rows);
    });
});

router.get('/lastRecord', (request,response,next) =>{
    db_connection.query("SELECT * FROM profile ORDER BY profileid DESC LIMIT 1", (error,result) =>{
        if(error){
            response.status(300).json("Error no records");
        }
        else{
            response.status(200).json(result.rows);
        }
    });
});
//add a profile
router.post('/profile/add', (request,response, next) =>{
    const{firstname,lastname,phonenumber} = request.body;
    db_connection.query("INSERT INTO profile (firstname,lastname,phonenumber) VALUES($1,$2,$3)",
    [firstname,lastname,phonenumber], (error, result)=>{
        if(error){
            response.status(304).json("Profile has failed");
        }
        else{
            response.status(200).json("Profile has been successfully created");
            return;
        }
    });
});
//update a profile.
router.put('/profile/update', (request,response,next) =>{
    const{profileid,firstname,lastname,phonenumber} = request.body;
    db_connection.query("UPDATE profile SET firstname = $1, lastname = $2, phonenumber = $3 WHERE profileid = $4",
     [firstname,lastname,phonenumber,profileid], (error, result) =>{
        if(error){
            return next(error);
        }
        else{
            response.status(200).json("Profile has successfully been updated");
            return;
        }
    });
});

//delete a profile
router.delete('/profile/delete', (request,response,next) =>{
    const{profileid} = request.body;

    db_connection.query('DELETE FROM profile WHERE profileid = $1',[profileid],(error,result)=>{
        if(error){
            return next(error);
        }
        else{
            response.status(200).json("Profile successfully delete");
            return;
        }
    });
});

module.exports = router;