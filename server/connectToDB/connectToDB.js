const { history } = require('../routes/history/history');
const { calc } = require('../routes/calc/calc');

const connectToDB = (props) => {
  const {
    mysql,
    app,
    database,
    table,
    port,
    appPromiseRes,
    appPromiseRej,
  } = props;
  let { con } = props;

  try {
    con.connect((initialConnectErr) => {
      if (initialConnectErr) throw initialConnectErr;
      console.log('Connected!');

      con.query(`CREATE database IF NOT EXISTS ${database}`, (createtableErr) => {
        if (createtableErr) throw createtableErr;
        console.log(`database "${database}" is available`);

        con.query(`CREATE table IF NOT EXISTS ${database}.${table} (id INT AUTO_INCREMENT PRIMARY KEY, ip VARCHAR(255), number INT, result VARCHAR(255), date DATETIME)`, (err) => {
          if (err) throw err;
          console.log(`table "${database}.${table}" is available`);

          con.end((endConnectionErr) => {
            if (endConnectionErr) throw endConnectionErr;

            con = mysql.createConnection({
              host: process.env.HOST,
              user: process.env.USER_NAME,
              password: process.env.PASSWORD,
              database,
            });

            con.connect((connectionToDBErr) => {
              if (connectionToDBErr) throw connectionToDBErr;
              console.log(`Connected to "${database}" database. Application ready to start`);

              app.use((req, res, next) => {
                req.mysqlCon = con;
                next();
              });

              app.get('/history', history);
              app.post('/calc', calc);

              app.listen(port, () => {
                if (appPromiseRes) appPromiseRes({ app, con, mysql });
                console.log(`Started on port ${port}`);
              });
            });
          });
        });
      });
    });
  } catch (error) {
    if (appPromiseRej) appPromiseRej(error);
  }
};

module.exports = connectToDB;
