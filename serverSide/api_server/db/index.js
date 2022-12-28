const mysql = require('mysql')
const db = mysql.createPool({
    url: '127.0.0.1',
    user: 'root',
    password: 'GTX980Titan',
    database: 'my_db_01'
})
module.exports = db