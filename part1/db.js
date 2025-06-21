const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService',
    multipleStatements: true
};

async function initDatabase() {
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
    });
    await connection.execute('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();
}

async function getConnection() {
    return awaimysql.createConnection(dbConfig);
}

module.exports = {initDatabase, getConnection};