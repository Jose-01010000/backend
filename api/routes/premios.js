const express = require("express");
const router = express.Router();
const md5 = require("md5");

const mysqlConnection = require("../connection/connection");

router.get("/premios", (req, res) => {
  mysqlConnection.query("select * from premios", (err, row, fields) => {
    if (!err) {
      res.json(row);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
