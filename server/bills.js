const express = require('express');

const router = express.Router();
const db = require('./db');

router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = `INSERT INTO Bills () WHERE uID = ${user_id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      Success: true
    });
  });
});

router.post('/create', (req, res) => {
  console.log('/create');
  const user_id = req.body.uID;
  const fromAcct = req.body.accounts[0].accountID;
  const amt = req.body.payamt;
  const creationDate = req.body.date;
  const days = 30;
  console.log(user_id, fromAcct, amt, creationDate, days);
  const sql = `INSERT INTO Bills (uID, accountID, billBalance, creationDate, days) VALUES (${user_id}, ${fromAcct}, ${amt}, ${creationDate}, ${days});`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ Success: true });
  });
});

module.exports = router;
