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
  // Form validation
  const { errors, isValid } = validateRegisterInput(post);
  console.log('hit registration');
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // if the registration details are valid, insert user into database
  // username, password, email, firstname, lastname
  const { username } = post;
  const { password } = post;
  const { email } = post;
  const { firstname } = post;
  const { lastname } = post;
  // / Hash password before saving in database with bcrypt
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      console.log(err);
    } else {
      const sql = `INSERT INTO Users(username, password, email, firstname, lastname) VALUES (${username}, ${hash}, ${email}, ${firstname}, ${lastname});`;
    }
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

  const sql = `SELECT * FROM Users WHERE username='${username}' AND password=${password}`;
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    bcrypt.compare(password, result.password, function(response) {
      if (response === true) {
        res.send(null);
      }
    });
    if (result.length > 0) {
      res.send(result);
    }
    // Incorrect Username or Password
    else {
      // Login Successful
      res.send(null);
      console.log('incorrect u and p');
    }
  });
});

module.exports = router;
