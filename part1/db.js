const mysql = require('mysql2/promise');

const db = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  host: '127.0.0.1',
  user: 'root',
  password: 'newpassword',
  database: 'textbook_marketplace'
});

module.exports = db;


const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '' // Set your MySQL root password
});


// Now connect to the created database
db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});