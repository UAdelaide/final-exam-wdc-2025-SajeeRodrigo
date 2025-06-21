var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2/promise');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let db;

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();

    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService',
      multipleStatements: true
    });

    const sqlFilePath = path.join(__dirname, 'dogwalks.sql');
    const schemaSQL = fs.readFileSync(sqlFilePath, 'utf8');
    await db.query(schemaSQL);

    

    console.log('Database and tables setup complete.');
  } catch (err) {
    console.error('Error setting up database. Ensure MySQL is running:', err.message);
  }
})();

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
