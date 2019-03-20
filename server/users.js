const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const db = require('./db')
// Load input validation
const validateRegisterInput = require("./register");
const validateLoginInput = require("./login");

//TODO: Load User model from mysql

// @route POST users/register
// @desc Register user
// @access Public
router.get('/test', function(req, res) {
  res.send('yo test')
});

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log('hit registration')
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //if the registration details are valid, insert user into database
  //name, email, password
  
  /// Hash password before saving in database with bcrypt
  
});

// @route POST users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  console.log('hit login')
  // Check validation
  if (!isValid) {
    console.log(errors)
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  console.log(email)
  
  //check if user exists in db
  // SELECT * FROM users WHERE username='username' AND password='password'
});

module.exports = router;