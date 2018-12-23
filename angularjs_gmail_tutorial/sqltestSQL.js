var mysql = require('mysql');
var express = require('express');
var app = express();

// Create connection to database
var config =
{
    userName: 'richardleon', // update me
    password: 'LeonRichard123', // update me
    server: 'bbrle.database.windows.net', // update me
    options:
    {
        database: 'BargainBread', //update me
        encrypt: true
    }
}

var conn = mysql.createConnection( {
    host: "bargainbread-mysqldbserver.mysql.database.azure.com",
    user: "richardleon@bargainbread-mysqldbserver",
    password: 'LeonRichard123',
    database: 'bbrle',
    port: 3306
  });

// Attempt to connect and execute queries if connection goes through. throw err if failed.
conn.connect(function(err){
  if (err) throw err;
  else console.log("Connected!");
  readDatabase();
})

app.post('/view/:fid', function(req, res){
  var food = req.body.params;
  var query = 'INSERT INTO Food SET ?'
  insertDatabase(query, food);
})


///////////// functions //////////////////

//Read all from database.
function readDatabase()
{
  conn.query('SELECT * From Food', function(err, results, fields){
    if (err) throw err;
    else console.log('Selected ' + results.length + 'row(s).');
    for (i = 0; i< results.length; i++){
      console.log('Row: ' + JSON.stringify(results[i]));
    }
    console.log('Done.');
    return JSON.stringify(results);
  })
  conn.end(function(err){
    if (err) throw err;
    else console.log('Closing connection.');
  })
}

function insertDatabase(insert, data)
{
  conn.query(insert, data,
  function(err, results, fields){
    if (err) throw err;
    console.log('Inserted ' + results.affectedRows + ' row(s).');
  })
  conn.end(function(err){
    if (err) throw err;
    else console.log('Done.');
  })
}
