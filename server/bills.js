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
  const { user_id } = req.uID;
  const { fromAcct } = req.fromAcct;
  const { amt } = req.payamt;
  const { creationDate } = req.creationDate;
  const { days } = req;

  const sql = `INSERT INTO Bills (uID, accountID, billBalance, creationDate, days) VALUES (${user_id}, ${fromAcct}, ${amt}, ${creationDate}, ${days});`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
