const express = require('express');

const router = express.Router();
const db = require('./db');

router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = `SELECT * FROM Transactions WHERE uID = ${user_id};`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
