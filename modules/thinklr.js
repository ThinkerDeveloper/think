var pg=require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:Mattia302012@127.0.0.1:5432/thinklr';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE thinklr(id SERIAL PRIMARY KEY, path_image VARCHAR(255) not null,title VARCHAR(40) not null, description VARCHAR(255) not null,number_of_positive INTEGER, number_of_negative INTEGER, id_user INTEGER not null)');
query.on('end', function() { client.end(); });