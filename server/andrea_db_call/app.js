const express = require('express');
const mysql = require('mysql');

//Create Connection
const db = mysql.createConnection({
	host     : '35.238.242.28',
    user     : 'teammember',
    password : '1234',
    database : 'bank',
   	port 	 : '3306'
});

//Connect
db.connect((err) => {
  if (err) throw err
  console.log('You are now connected...');
});


const app = express();

//Create DB
app.get('/createdb', (req,res) =>{
	let sql = 'CREATE DATABASE bank';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Database created...');
	});
});

//Create table
app.get('/createusertable', (req,res) =>{
	let sql = 'CREATE TABLE user(id int AUTO_INCREMENT primary key , username varchar(255), password varchar(255))';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('User table created...');
	});
});

//Insert user 1
app.get('/adduser1', (req, res) => {
	let user = {username:'larry', password:'123'};
	let sql = 'INSERT INTO user SET ?';
	let query = db.query(sql, user, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('User 1 added...');
	});
});

//Insert user 2
app.get('/adduser2', (req,res) => {
	let user = {username:'mary', password:'111'};
	let sql = 'INSERT INTO user SET ?';
	let query = db.query(sql,user, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('User 2 added...');
	});
});

app.get('/getusers', (req,res) => {
	let sql = 'SELECT * FROM user';
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Posts fetched...');
	});
});

app.listen(3000, function(){
	console.log("Server Started on Port 3000...");
});