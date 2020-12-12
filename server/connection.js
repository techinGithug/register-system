const mysql = require('mysql');

// FOR POSTGRE DB
// const Pool = require("mysql").Pool;

// const pool = new Pool({
//     connectionLimit : 10,
//     host: "localhost",
//     user: "root",
//     password: "myadmin",
//     database: "mydb"
// });

// module.exports = pool;

// FOR MYSQL DB
const mysqlConnection  = mysql.createConnection({
    host: "127.0.0.1:3306",
    user: "root",
    password: "myadmin",
    database: "geneus",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err) {
        // console.log("Connection success...")
        
    } else {
        console.log("Connection failed..")
    }
});

module.exports = mysqlConnection;