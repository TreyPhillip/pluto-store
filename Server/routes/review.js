var db_connection = require('../database/database_connection');
var express = require('express');
var router = express.Router();

//get all reviews
router.get('/reviews', (request,response,next) => {
    db_connection.query('SELECT * FROM reviews',(error, result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json(result.rows);
    });
});
//get a review
    router.get('/reviews/:id',(request, response,next) =>{
        const id = parseInt(request.params.id)

        db_connection.query('SELECT * FROM reviews WHERE reviewid = $1', [id], (error,result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json(result.rows);
    });
});
//add a review
    router.post('/reviews/add', (request,response, next) => {
    const{reviewerid,reviewedid,numberrating,reviewcomment,datereviewed} = request.body;

    db_connection.query('INSERT INTO reviews (reviewerid,reviewedid,numberrating,reviewcomment,datereviewed) VALUES($1,$2,$3,$4,$5)',
    [reviewerid,reviewedid,numberrating,reviewcomment,datereviewed],(error,results) =>{
        if(error){
            return next(error);
        }
        response.status(200).json("Review has successfully been added");
    });
 });

//update a review
router.put('/reviews/update', (request,response,next) => {
    const{numberrating,reviewcomment,datereviewed,reviewid} = request.body;

    db_connection.query('UPDATE reviews SET numberrating =$1, reviewcomment=$2, datereviewed=$3 WHERE reviewid = $4',
    [numberrating,reviewcomment,datereviewed,reviewid],(error,results) =>{
        if(error){
            return next(error);
        }
    });
    response.status(200).json('Review has been updated successfully');
});

//delete a review
router.delete('/reviews/delete', (request, response,next) => {
    const{reviewid} = request.body;
  
    db_connection.query('DELETE FROM reviews WHERE reviewid = $1', [reviewid], (error, results) => {
      if (error) {
         return next(error)
      }
      response.status(200).send('Review deleted with ID')
    });
  });

  module.exports = router;