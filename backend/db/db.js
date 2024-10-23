const mysql = require('mysql2');
const database = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    user: process.env.USER
})
database.connect((err)=>{
    if(err){
        console.error("Database not connected".err.message);
        return;
    }
    console.log("Database connected!");
})
module.exports = database;