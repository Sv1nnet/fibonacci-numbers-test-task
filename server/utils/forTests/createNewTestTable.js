const { TEST_DATABASE: database, TABLE: table } = process.env;

/**
 * Creates new test table
 * @param {Object} con - connection to DB
 * @param {() => {}} done - callback to be invoked at the end of test hook
 * @param {(con, done: () => {}) => void} callback - invokes once table was created;
 * takes con and done in raguments
 */
function createNewTestTable(con, done, callback) {
  con.query(`DROP TABLE ${table}`, (err) => {
    if (err) throw err;

    con.query(`CREATE table IF NOT EXISTS ${database}.${table} (id INT AUTO_INCREMENT PRIMARY KEY, ip VARCHAR(255), number INT, result VARCHAR(255), date DATETIME)`, (createTableErr) => {
      if (createTableErr) throw createTableErr;

      if (callback) callback(con, done);
      else done();
    });
  });
}

module.exports = { createNewTestTable };
