const mysql = require('mysql2');

const db = mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password':'Dkp@9692',
    'database':'main_database'
})

db.connect((err)=>{
    if(err) console.log(err);
    console.log("Database connected successfully");
})

module.exports = db;