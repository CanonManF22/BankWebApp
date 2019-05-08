const express = require('express');

const router = express.Router();
const db = require('./db');

// TODO:
// get all accounts of a user
router.get('/:user_id', (req, res) => {
  console.log(req.params);
  const { user_id } = req.params;
  console.log(user_id);

  const sql = `SELECT * FROM Accounts WHERE uID = ${user_id}`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// generate manager reports by filter
router.get('/reports', (req, res) => {
  const parameters = JSON.stringify(req.filters).replace(':', '=');
  console.log(req.params);
  const { user_id } = req.params;
  console.log(user_id);

  // query with options
  const sql = `SELECT * FROM Accounts WHERE ${parameters}`;
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
  const toAcct = req.body.option1;
  const date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  console.log(date);

  const sql = `UPDATE Accounts SET accBalance = accBalance + ${depositAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${toAcct}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const sqlt = `INSERT INTO Transactions(uID, originAccountID, receiverAccountID, transactionDate, payment, type) VALUES ('${uID}', '${toAcct}', '${toAcct}', '${date}', ${depositAmt}, 'deposit');`;
    console.log(result);
    db.query(sqlt, (err, result1) => {
      if (err) throw err;
      console.log('deposit success');
      res.send({
        Success: true
      });
    });
  });
});

// withdraw for taking out from ATM --> so far it is not use
router.post('/:account_id/withdraw', (req, res) => {
  const accountId = req.params.account_id;
  // TODO: check if uID is the same as account.uID
  const { uID } = req;
  const { withdrawAmt } = req;
  const toAcct = req.body.accounts[0].accountID;
  const sql = `UPDATE Accounts SET accBalance = accBalance - ${withdrawAmt} WHERE Accounts.uID = ${uID}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('withdraw amount');
    const sqlt = `INSERT INTO Transactions (uID, originAccountID, receiverAccountID, transactionDate, payment, type) VALUES ('${uID}', '${toAcct}', '${toAcct}', '${date}', ${withdrawAmt}, 'withdraw');`;
    db.query(sqlt, (err1, result1) => {
      if (err1) throw err1;
      console.log('Create a transaction for  withdraw');
    });

    // console.log(result);
    res.send({
      Success: true
    });
  });
});

router.post('/:user_id/transfer', (req, res) => {
  // TODO: check if uID is the same as account.uID
  const { uID } = req.body;
  const withdrawAmt = req.body.transferamt;
  const fromAcct = req.body.option1.split(' - ')[1]; // req.body.accounts[0].accountID;
  const toAcct = req.body.option2.split(' - ')[1]; // req.body.accounts[1].accountID;
  const date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  console.log(uID, withdrawAmt, fromAcct, toAcct);
  // TODO: make transfer sql
  const sql = `UPDATE Accounts SET accBalance = accBalance - ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${fromAcct}`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('withdraw amount');
    const sqlt = `INSERT INTO Transactions (uID, originAccountID, receiverAccountID, transactionDate, payment, type) VALUES ('${uID}', '${fromAcct}', '${toAcct}', '${date}', ${withdrawAmt}, 'withdraw');`;
    db.query(sqlt, (err, result) => {
      if (err) throw err;
      console.log('Create a transaction for  withdraw');
      const sql1 = `UPDATE Accounts SET accBalance = accBalance + ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${toAcct}`;
      console.log(sql1);
      db.query(sql1, (err, result) => {
        if (err) throw err;
        console.log('transfered amount');
        const sqlt1 = `INSERT INTO Transactions(uID, receiverAccountID, originAccountID, transactionDate, payment,type) VALUES ('${uID}', '${fromAcct}', '${toAcct}', '${date}', ${withdrawAmt}, 'deposit');`;
        db.query(sqlt1, (err, result) => {
          if (err) throw err;
          console.log('Create a transaction for deposit');
          res.send({
            Success: true
          });
          console.log('res sent');
        });
      });
    });
  });
});

router.post('/:user_id/transferExternal', (req, res) => {
  const { uID } = req.body;
  const withdrawAmt = req.body.transferamt;
  const acctID = req.body.option1.split(' - ')[1];
  const { routingnum } = req.body;
  const { accountnum } = req.body;
  const { bankname } = req.body;
  const transactionType = `Transfer to bank: ${bankname}`;

  const sql = `UPDATE Accounts SET accBalance = accBalance - ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${acctID}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('withdraw amount');
    const sqlt = `INSERT INTO Transactions (uID, originAccountID, receiverAccountID, payment, type) VALUES ('${uID}', '${acctID}', '${accountnum}',  ${withdrawAmt}, 'Transfer to other bank');`;
    db.query(sqlt, (err1, result1) => {
      if (err1) throw err1;
      console.log('Create a transaction for transfer to another Bank');
    });
    console.log('fuck yeah');
    console.log(result);
    res.send({
      Success: true
    });
  });
});

router.post('/:user_id/transferInternal', (req, res) => {
  // TODO: check if uID is the same as account.uID
  const { uID } = req.body;
  const withdrawAmt = req.body.transferamt;
  const fromAcct = req.body.option1.split(' - ')[1]; // req.body.accounts[0].accountID;
  const toAcct = req.body.option2.split(' - ')[1]; // req.body.accounts[1].accountID;
  const date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  // subtract amount
  const sql = `UPDATE Accounts SET accBalance = accBalance - ${withdrawAmt} WHERE Accounts.uID = ${uID} AND Accounts.accountID = ${fromAcct}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // create transaction
    const sqlt = `INSERT INTO Transactions (uID, originAccountID, receiverAccountID, transactionDate, payment, type) VALUES ('${uID}', '${fromAcct}', '${toAcct}', '${date}', ${withdrawAmt}, 'withdraw');`;
    db.query(sqlt, (err, result) => {
      if (err) throw err;
      // add amount to toAcct of toID
      const sql1 = `UPDATE Accounts SET accBalance = accBalance + ${withdrawAmt} WHERE Accounts.uID = ${toID} AND Accounts.accountID = ${toAcct}`;
      db.query(sql1, (err, result) => {
        if (err) throw err;
        const sqlt1 = `INSERT INTO Transactions(uID, receiverAccountID, originAccountID, transactionDate, payment,type) VALUES ('${toID}', '${fromAcct}', '${toAcct}', '${date}', ${withdrawAmt}, 'deposit');`;
        db.query(sqlt1, (err, result) => {
          if (err) throw err;
          res.send({
            Success: true
          });
        });
      });
    });
  });
});

module.exports = router;
