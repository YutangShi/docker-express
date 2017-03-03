const mysql = require('mysql');
//connect to mysql server
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'database'
});
connection.connect();

module.exports = connection;