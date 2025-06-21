const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService',
    multipleStatements: true
};

async function initDatabase() {
    
}