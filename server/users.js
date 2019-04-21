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
  const { userType } = post;
  let response = false;
  // / Hash password before saving in database with bcrypt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      else {
        const user_check = `SELECT * FROM Users WHERE username='${username}'`;
        db.query(user_check, (err1, result) => {
          if (err1) throw err1;
          if (result.length === 0) {
            const sql = `INSERT INTO Users(username, password, email, firstname, lastname) VALUES ('${username}', '${hash}', '${email}', '${firstName}', '${lastName}')`;
            db.query(sql, (err2, result1) => {
              if (err2) throw err2;
              response = true;
            });
          } else if (result.length > 0) {
            console.log('user existed');
          }
        });
      }
      if (response) {
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
      if (!result1) {
        res.send({
          Success: false
        });
      }
      if (result1) {
        res.send({
          Success: true,
          uID: result[0].uID
        });
      }
    });
  });
});

module.exports = router;
