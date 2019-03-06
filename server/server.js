const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const users = require("./users");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
//TODO: ADD DB Config

app.get('/', function(req, res){
  res.send('hello world')
});

// Routes
const test = require('./test.js');
//app.use('/test', test);
app.use("/users", users);

const port = process.env.PORT || 5050; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));