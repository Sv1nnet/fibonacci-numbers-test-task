const { fibonacci } = require('../../utils/fibonacci.js');
const { createRecord } = require('./utils/createRecord');

const calc = (req, res) => {
  const con = req.mysqlCon;
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  const { number } = req.body;

  try {
    const result = fibonacci(number);

    createRecord(con, { ip, number, result }, () => res.json(result));
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { calc };