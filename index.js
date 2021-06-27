const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');

var con = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bc595431952f6c",
  password: "729573a2",
  database: "heroku_76b5d63f29873f3"
});

app.get('/', (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM person", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.listen(process.env.PORT || port, () => {
  console.log('Example app listening to port ${port}.');
});