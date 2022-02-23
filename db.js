const mysql = require('mysql')

//koneksi
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "laundry_node"
})

module.exports = db;