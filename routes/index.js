var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:Mattia302012@127.0.0.1:5432/thinklr';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Thinkler' });
});

router.get('/api/alpha1/all_users', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

//Create a thinkler
router.post('/api/alpha1/create_thinkler/:id_user', function(req, res) {

    var results = [];
	
	//Grab the data from the params
	var id_user=req.params.id_user;
	
    // Grab data from http request
    var data = {path: req.body.path, title: req.body.title, description:req.body.description}

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
		
        // SQL Query > Insert Data
        client.query("INSERT INTO thinklr(path_image, title,description,id_user) values($1, $2, $3, $4)", [data.path, data.title, data.description,id_user]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM thinklr ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

//Create the user
router.post('/api/alpha1/create_user', function(req, res) {

    var results = [];
	
    // Grab data from http request
    var data = {username: req.body.username, first_name: req.body.first_name, last_name:req.body.last_name, email: req.body.email}

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
			
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
		
        // SQL Query > Insert Data
        client.query("INSERT INTO users(username, first_name,last_name,email) values($1, $2, $3, $4)", [data.username, data.first_name, data.last_name,data.email]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

module.exports = router;
