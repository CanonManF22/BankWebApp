const mysql = require('mysql');

// Create Connection
const db = mysql.createConnection({
  host: '35.238.242.28',
  user: 'teammember',
  password: '12345678',
  database: 'bank',
  port: '3306'
});

// Connect
db.connect(err => {
  if (err) throw err;
  console.log('You are now connected...');
});

module.exports = db;
