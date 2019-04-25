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
  const { uID } = req.body;
  const { depositAmt } = req.body;
  const toAcct = req.body.accounts[0].accountID;
  var date = new Date();

  const sql = `UPDATE Accounts SET accBalance = accBalance + ${depositAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${toAcct}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    /*
    res.send({
      Success: true
    });*/

  });

  const sqlt = `INSERT INTO Transactions(uID, originAccountID, originAccountID, date, payment,type) VALUES ('${uID}', '${toAcct}', '${toAcct}', '${date}', ${depositAmt}, 'deposit');`;
  db.query(sqlt, (err, result) => {
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
  const fromAcct = req.body.accounts[0].accountID;
  const toAcct = req.body.accounts[1].accountID;
  const date = new Date();

  console.log(uID, withdrawAmt, fromAcct, toAcct);
  // TODO: make transfer sql
  const sql = `UPDATE Accounts SET accBalance = accBalance - ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${fromAcct}`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('withdrew amount');
  });

  const sqlt = `INSERT INTO Transactions (uID, originAccountID, receiverAccountID, payment,type) VALUES ('${uID}', '${fromAcct}', '${toAcct}', ${withdrawAmt}, 'withdraw');`;
  db.query(sqlt, (err, result) => {
    if (err) throw err;
    console.log('Create a transaction for  withdraw');
    /*
    res.send({
      Success: true
    });*/
});

  const sql1 = `UPDATE Accounts SET accBalance = accBalance + ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${toAcct}`;
  console.log(sql1);
  db.query(sql1, (err, result) => {
    if (err) throw err;

    console.log('transfered amount');
  });

  const sqlt1 = `INSERT INTO Transactions(uID, receiverAccountID, originAccountID, payment,type) VALUES ('${uID}', '${fromAcct}', '${toAcct}', ${withdrawAmt}, 'deposit');`;
  db.query(sqlt1, (err, result) => {
    if (err) throw err;
    console.log('Create a transaction for deposit');
    /*
    res.send({
      Success: true
    });*/
});
  res.send('Hello World');
});

router.post('/:user_id/transferExternal', (req, res) => {
  const { uID } = req.body;
  const withdrawAmt = req.body.transferamt;
  const acctID = req.body.option1.split(' - ')[1];

  // TODO: make transfer sql
  const sql = `UPDATE Accounts SET accBalance = accBalance - ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${acctID}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('fuck yeah');
    console.log(result);
  });

  res.send({
    Success: true
  });
});

module.exports = router;
