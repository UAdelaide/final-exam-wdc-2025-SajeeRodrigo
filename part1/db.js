const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '' // Set your MySQL root password
});

// Create the database if it doesn't exist
await connection.query('CREATE DATABASE IF NOT EXISTS testdb');
await connection.end();

// Now connect to the created database
db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});