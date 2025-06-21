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

    try{
        const [user_count] = await db.execute('SELECT COUNT(*) AS count FROM Users');
        if (user_count[0].count === 0) {
        await db.execute(`
            INSERT INTO Users (username, email, password_hash, role)
            VALUES ('alice123', 'alice@example.com', 'hashed123', 'owner');

            INSERT INTO Users (username, email, password_hash, role)
            VALUES ('bobwalker', 'bob@example.com', 'hashed456', 'walker');

            INSERT INTO Users (username, email, password_hash, role)
            VALUES ('carol123', 'carol@example.com', 'hashed789', 'owner');

            INSERT INTO Users (username, email, password_hash, role)
            VALUES ('sajee123', 'sajee@example.com', 'hashed777', 'owner');

            INSERT INTO Users (username, email, password_hash, role)
            VALUES ('rodrigo456', 'rodrigo@example.com', 'hashed888', 'walker');
        `);
        }
    }
    catch(err){
        console.error("Failed to insert User details", err);
    }

    try{
        const [dog_count] = await db.execute('SELECT COUNT(*) AS count FROM Dogs');
        if (dog_count[0].count === 0) {
          await db.execute(`
            INSERT INTO Dogs(owner_id, name, size)
            VALUES (SELECT user_id FROM Users WHERE username = 'alice123', 'Max', 'medium');


            INSERT INTO Dogs(owner_id, name, size)
            VALUES (SELECT user_id FROM Users WHERE username = 'carol123', 'Bella', 'small');

            INSERT INTO Dogs(owner_id, name, size)
            VALUES (SELECT user_id FROM Users WHERE username = 'sajee123, 'Jimmy', 'small');

            INSERT INTO Dogs(owner_id, name, size)
            VALUES (SELECT user_id FROM Users WHERE username = 'sajee123, 'Tommy', 'medium');

            INSERT INTO Dogs(owner_id, name, size)
            VALUES (SELECT user_id FROM Users WHERE username = 'rodrigo456', 'Sheeba', 'large');
          `);
        }
    }
    catch(err){
        console.error("Failed to insert Dog details", err);
    }

    try{

        const [req_count] = await db.execute('SELECT COUNT(*) AS count FROM Dogs');
        if (req_count[0].count === 0) {
          await db.execute(`
            INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status)
            VAUES (SELECT dog_id FROM Dogs WHERE name = 'Max', '2025-06-10 08:00:00', 30, 'Parklands', 'open');

            INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status)
            VAUES (SELECT dog_id FROM Dogs WHERE name = 'Bella', '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted');

            INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status)
            VAUES (SELECT dog_id FROM Dogs WHERE name = 'Jimmy', '2025-06-10 10:30:00', 30, 'Northfield', 'completed');

            INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status)
            VAUES (SELECT dog_id FROM Dogs WHERE name = 'Jimmy', '2025-06-11 10:00:00', 60, 'Parafield', 'open');

            INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status)
            VAUES (SELECT dog_id FROM Dogs WHERE name = 'Tommy', '2025-06-11 10:00:00', 60, 'Parafield', 'open');
          `);
        }
    }
    catch(err){
        console.error("Failed to insert walk request details", err);
    }


    console.log('Database and tables setup complete.');
  } catch (err) {
    console.error('Error setting up database. Ensure MySQL is running:', err.message);
  }
})();

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
