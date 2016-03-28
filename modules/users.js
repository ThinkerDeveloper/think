var pg=require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:Mattia302012@127.0.0.1:5432/thinklr';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(40) not null,first_name VARCHAR(40) not null, last_name VARCHAR(40) not null,email VARCHAR(40) not null)');
query.on('end', function() { client.end(); });