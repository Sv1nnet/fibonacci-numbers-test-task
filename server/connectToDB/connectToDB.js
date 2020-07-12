/**
 * Connect to common DB, create DB specified in .env, drop previous connection,
 * create new connection the created DB and invoke callback
 * if it's provided with new connection as argument.
 * @param {Object} (props) - contains variables for connecting to DB and launching application
 * @param {Object} props.mysql - mysql object to create a new connection to DB
 * @param {string} props.database - name of DB to create
 * @param {string} props.table - name of table to create in new DB
 * @param {Function} props.errorHandler - handler thaw take error as argument
 * @param {Object} props.con - initial connection which will be reassigned after new DB is created
 * and provided into callback
 * @param {Function} callback - callback which invokes after connection to DB is created
 */
const connectToDB = (props, callback) => {
  const {
    mysql,
    database,
    table,
    errorHandler,
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

              if (callback) callback(con);
            });
          });
        });
      });
    });
  } catch (error) {
    if (errorHandler) errorHandler(error);
  }
};

module.exports = connectToDB;
