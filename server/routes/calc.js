const { fibonacci } = require('../utils/fibonacci.js');

const calc = (req, res) => {
  const con = req.mysqlCon;
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  const { number } = req.body;

  try {
    const result = fibonacci(number);
    const sql = `INSERT INTO ${process.env.TABLE} (ip, number, result, date) VALUES ('${ip}', ${number}, ${result}, now())`;

    con.query(sql, (err, queryResult) => {
      if (err) throw err;

      res.json(result);
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = { calc };
