/**
 * Created by JFCS on 3/18/16.
 */
var express = require('express');
var pg = require('pg');
var router = express.Router();
var connectionString = 'postgres://localhost:5432/week_four_todo';


router.get('/',function (request,response){

    pg.connect(connectionString,function(err,client,done){
        if(err){
            done();
            console.log("error connecting to database",err);
            response.status(500).send(err);
        } else{
            var results = [];
            var query = client.query("SELECT * FROM todos");
        }
        query.on('row',function(row){
            results.push(row);
        });
        query.on('end',function(){
            done();
            response.send(results);
        });
        query.on('error',function(error){
            console.log('Error returning query', error);
            done();
            response.status(500).send(error);
        });
    });


});

router.post('/',function (request,response){
    var todos  = request.body.todos;
    var completed = false;
    pg.connect(connectionString,function(err,client,done){
        if(err){
            done();
            console.log("error connecting to database",err);
            response.status(500).send(err);
        } else{
            var results = [];
            var query = client.query("INSERT INTO todos (todos,completed) VALUES ($1,$2) RETURNING id, todos, completed ;",[todos, completed]);
        }
        query.on('row',function(row){
            results.push(row);
        });
        query.on('end',function(){
            done();
            response.send(results);
        });
        query.on('error',function(error){
            console.log('Error returning query', error);
            done();
            response.status(500).send(error);
        });
    });

});


router.put('/',function (request,response){
    console.log(request.body);
    var completed = request.body.boolean;
    var id = request.body.id;
    console.log("before",completed);
    if (completed === 'true'){
        completed = 'false';
     } else {
        completed = 'true';
    }

    console.log('after',completed);
    pg.connect(connectionString,function(err,client,done){
        if(err){
            done();
            console.log("error connecting to database",err);
            response.status(500).send(err);
        } else{
            var results = [];
            var query = client.query("UPDATE todos SET completed = $1 WHERE id = $2 RETURNING id, todos, completed ;",[completed, id]);
        }
        query.on('row',function(row){
            results.push(row);
        });
        query.on('end',function(){
            done();
            response.send(results);
        });
        query.on('error',function(error){
            console.log('Error returning query', error);
            done();
            response.status(500).send(error);
        });
    });

});

router.delete('/',function (request,response){
    var id = request.body.number;
    pg.connect(connectionString,function(err,client,done){
        if(err){
            done();
            console.log("error connecting to database",err);
            response.status(500).send(err);
        } else{
            var results = [];
            var query = client.query("DELETE FROM todos WHERE id = $1 RETURNING id, todos, completed ;",[id]);
        }
        query.on('row',function(row){
            results.push(row);
        });
        query.on('end',function(){
            done();
            response.send(results);
        });
        query.on('error',function(error){
            console.log('Error returning query', error);
            done();
            response.status(500).send(error);
        });
    });

});


module.exports = router;