const { TEST_DATABASE: database, TABLE: table } = process.env;

function createNewTestTable(con, done, callback) {
  con.query(`DROP TABLE ${table}`, (err) => {
    if (err) throw err;

    con.query(`CREATE table IF NOT EXISTS ${database}.${table} (id INT AUTO_INCREMENT PRIMARY KEY, ip VARCHAR(255), number INT, result VARCHAR(255), date DATETIME)`, (err) => {
      if (err) throw err;

      if (callback) callback(con, done);
      else done();
    });
  });
}

module.exports = { createNewTestTable };
