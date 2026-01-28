var mysql = require('mysql2');

var con = mysql.createConnection({
    user: 'root',
    password: 'S11solai',
    host: 'localhost',
    dateStrings: true,
    database: 'f2',
    charset: 'utf8',
});

con.connect(function(err) {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("Database Connected!");
    }
});

module.exports = con;
