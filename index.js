const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');

var con = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bc595431952f6c",
  password: "729573a2",
  database: "heroku_76b5d63f29873f3"
});

app.get('/', (req, res) => {
  con.getConnection(function (err, tempconnection) {
    if (err) { res.send("Error occured!"); }
    else {
      var sql = "SELECT * FROM person";
      con.query(sql, function (err, result, fields) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      tempconnection.release();
      });
    }
  });
});

app.listen(process.env.PORT || port, () => {
  console.log('Example app listening to Heroku port.');
});