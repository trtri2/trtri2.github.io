var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
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
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
         queryDatabase();
        }
    }
);

app.post('/api/', function(req, res, next){
    var cope = req.body.params;
    var query = connection.query('insert into food VALUES(?)', cope, function(err, result) {
     if (err) {
       console.error(err);
       return res.send(err);
     } else {
       return res.send('Ok');

     }

});
});
app.listen(8080);


function queryDatabase()
{
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * From Food",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}
