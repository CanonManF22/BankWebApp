const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('./db');
// Load input validation
const validateRegisterInput = require('./register');
const validateLoginInput = require('./login');

// @route POST users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  const { post } = req.body;
  console.log(post);
  // Form validation
  const { errors, isValid } = validateRegisterInput(post);
  console.log('hit registration');
  // Check validation
  if (!isValid) {
    console.log('not valid');
    return res.status(400).json(errors);
  }
  // if the registration details are valid, insert user into database
  // username, password, email, firstName, lastName
  const { username } = post;
  const { password } = post;
  const { email } = post;
  const { firstName } = post;
  const { lastName } = post;
  // / Hash password before saving in database with bcrypt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        console.log(hash.length);
        //const sql = `INSERT INTO Users(username, password, email, firstname, lastname) VALUES ('${username}', '${hash}', '${email}', '${firstName}', '${lastName}')`;
        
        const sql = `INSERT INTO bank.Users (username, password, email, firstname, lastname)
                      SELECT * FROM (SELECT '${username}', '${hash}', '${email}', '${firstName}', '${lastName}') AS tmp
                      WHERE NOT EXISTS (
                      SELECT username, email FROM bank.Users WHERE username = '${username}' OR email = '${email}'
                      )LIMIT 1`;
        console.log(sql);
        const query = db.query(sql, (err, result) => {
          if (err) throw err;
          console.log('Authentication Worked');
          res.send();
        });
      }
    });
  });
});

// @route POST users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { post } = req.body;
  const { errors, isValid } = validateLoginInput(post);
  console.log(post);
  // Check validation
  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  }
  const { username } = post;
  const { password } = post;

  const sql = `SELECT * FROM Users WHERE username='${username}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const hashed = result[0].password;
    bcrypt.compare(password, hashed, (error, result1) => {
      if (error) throw error;
    });
    if (result.length > 0) {
      res.send({
        Success: true
      });
    } else {
      res.send({
        Success: false
      });
    }
  });
});

module.exports = router;
