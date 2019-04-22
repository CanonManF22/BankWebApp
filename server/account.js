const express = require('express');

const router = express.Router();
const db = require('./db');

// router.get('/', (req, res) => {
//   console.log('request to /');
// });

// TODO:
// get all accounts of a user
router.get('/:user_id', (req, res) => {
  console.log(req.params);
  const { user_id } = req.params;
  console.log(user_id);
  // res.send('hello world');
  const sql = `SELECT * FROM Accounts WHERE uID = ${user_id}`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// open account
router.post('/:user_id/open', (req, res) => {
  // generate from front end
  const uID = req.params.user_id;
  const accType = req.body.bankType;
  const sql = `INSERT INTO Accounts(uID, accType, accBalance) VALUES ('${uID}', '${accType}', 0);`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      Success: true
    });
  });
});

// close account
router.put('/:user_id/close', (req, res) => {
  // generate from front end
  const uID = req.params.user_id;
  const sql = `DELETE FROM Accounts WHERE accountID = ${uID}`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      Success: true
    });
  });
});

// deposit
router.post('/:account_id/deposit', (req, res) => {
  const accountId = req.params.account_id;
  // TODO: check if uID is the same as account.uID
  const { uID } = req;
  const { depositAmt } = req;
  const sql = `UPDATE Accounts SET accBalance = accBalance + ${depositAmt} WHERE Accounts.uID = ${uID}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      Success: true
    });
  });
});

// withdraw
router.post('/:account_id/withdraw', (req, res) => {
  const accountId = req.params.account_id;
  // TODO: check if uID is the same as account.uID
  const { uID } = req;
  const { withdrawAmt } = req;
  const sql = `UPDATE Accounts SET accBalance = accBalance - ${withdrawAmt} WHERE Accounts.uID = ${uID}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      Success: true
    });
  });
});

router.post('/:user_id/transfer', (req, res) => {
  // TODO: check if uID is the same as account.uID
  const { uID } = req.body;
  const withdrawAmt = req.body.transferamt;
  const fromAcct = req.body.accounts[1].accountID;
  const toAcct = req.body.accounts[0].accountID;

  console.log(uID, withdrawAmt, fromAcct, toAcct);
  // TODO: make transfer sql
  const sql = `UPDATE Accounts SET accBalance = accBalance - ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${fromAcct}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });

  const sql1 = `UPDATE Accounts SET accBalance = accBalance + ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${toAcct}`;
  db.query(sql1, (err, result) => {
    if (err) throw err;
    res.send({
      Success: true
    });
    console.log(result);
  });
});

module.exports = router;
