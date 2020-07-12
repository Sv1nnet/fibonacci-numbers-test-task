const path = require('path');

const env = process.env.NODE_ENV || 'development';
console.log('env *********', env);

if (env === 'development' || env === 'production') {
  process.env.PORT = 8081;
} else if (env === 'test') {
  process.env.PORT = 8082;
}

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');
const connectToDB = require('./connectToDB/connectToDB');
const { history } = require('./routes/history/history');
const { calc } = require('./routes/calc/calc');

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'POST'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('Incoming request', req.method, req.url);
  if (req.method !== 'OPTIONS') {
    next();
  } else {
    res.sendStatus(204);
  }
});

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
});

const { PORT: port, TABLE: table } = process.env;
const { DATABASE: database } = process.env;

// Since we connect to database asynchronously we need a way
// to signal that app is set up and listens to a port.
// So we resolve app running when we connect to DB
// and pass app, con and mysql as a data to resolve function.
const appPromise = new Promise((res, rej) => {
  const options = {
    mysql,
    con,
    database,
    table,
    errorHandler: rej,
  };

  if (env === 'development') {
    console.log('env is', env);
  } else if (env === 'test') {
    console.log('env is', env);
    options.database = process.env.TEST_DATABASE;
  } else if (env === 'production') {
    console.log('env is', env);
  }

  connectToDB(options, (DBconnection) => {
    app.use((req, resp, next) => {
      req.mysqlCon = DBconnection;
      next();
    });

    app.get('/history', history);
    app.post('/calc', calc);

    app.listen(port, () => {
      if (res) res({ app, con: DBconnection, mysql });
      console.log(`Started on port ${port}`);
    });
  });
});

if (env === 'production') {
  const { FRONT_PORT } = process.env;
  const appForServingFront = express();

  appForServingFront.use(express.static(path.resolve(__dirname, '../dist')));
  appForServingFront.use('/history', express.static(path.resolve(__dirname, '../dist')));

  appForServingFront.use((req, res, next) => {
    console.log('Incoming request for Font-end serving', req.url);
    next();
  });

  appForServingFront.listen(FRONT_PORT, () => {
    console.log(`appForServingFront is listening ${FRONT_PORT}`);
  });
}

// Export appPromise in case we need to do something after app started running
module.exports = {
  app,
  appPromise,
};
