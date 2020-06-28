const env = process.env.NODE_ENV || 'development';
console.log('env *********', env);

if (env === 'development') {
  process.env.PORT = 8081;
} else if (env === 'test') {
  process.env.PORT = 8081;
}

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();


const { history } = require('./routes/history');
const { calc } = require('./routes/calc');

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.method !== 'OPTIONS') console.log('Incoming request', req.method, req.url);
  next();
});

let con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`, (err, result) => {
    if (err) throw err;
    console.log(`Database "${process.env.DATABASE}" is available`);

    con.query(`CREATE TABLE IF NOT EXISTS ${process.env.DATABASE}.${process.env.TABLE} (id INT AUTO_INCREMENT PRIMARY KEY, ip VARCHAR(255), number INT, result  BIGINT, date  DATETIME)`, (err, result) => {
      if (err) throw err;
      console.log(`Table "${process.env.DATABASE}.${process.env.TABLE}" is available`);

      con.end((err, result) => {
        con = mysql.createConnection({
          host: process.env.HOST,
          user: process.env.USER_NAME,
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
        });

        con.connect((err) => {
          if (err) throw err;

          console.log(`Connected to "${process.env.DATABASE}" database. Application ready to start`)

          
          app.use((req, res, next) => {
            req.mysqlCon = con;
            next();
          })

          app.use('/history', history);
          app.use('/calc', calc);

          app.listen(port, () => {
            console.log(`Started on port ${port}`);
          });
        })
      })
    });
  })
});


module.exports = {
  app,
};
