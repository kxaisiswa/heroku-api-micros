const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
var path = require('path');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
      var sql = "SELECT * FROM student";
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

app.post('/input', (req, res) => {
  var idnum = req.body.idnum;
  var password = req.body.password;
  var name = req.body.name;
  var email = req.body.email;
  var age = req.body.age;

  con.getConnection(function (err, tempconnection) {
    if (err) { res.send("Error occured!"); }
    else {
      var sql = "INSERT INTO student (stud_idnum, stud_password, stud_name, stud_email, stud_age) VALUES ('"+idnum+"', '"+password+"', '"+name+"', '"+email+"', '"+age+"')";
      con.query(sql, function (err, result) {
        if (err) { throw err; }
        else {
          console.log("Successfully Inserted");
          res.sendFile(path.join(__dirname + '/index.html'));
        }
      tempconnection.release();
      });
    }
  });
});

app.listen(process.env.PORT || port, () => {
  console.log('Example app listening to Heroku port.');
});