const mysql = require('mysql2/promise.js');
const database = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    user: process.env.USER,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});
(async function checkConnection() {
    try {
        await database.getConnection();
        console.log("Database connected");
    } catch (err) {
        console.error("Database not connected:", err.message);
    }
})();
module.exports = database;