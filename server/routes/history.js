const history = (req, res) => {
  const con = req.mysqlCon;
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  
  try {
    const sql = `SELECT * FROM ${process.env.TABLE}`;
    con.query(sql, (err, sqlResult, fields) => {
      if (err) throw err;
      res.json(sqlResult);
    });
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = { history };
