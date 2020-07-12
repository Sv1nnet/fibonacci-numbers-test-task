const { fibonacci } = require('../../utils/fibonacci.js');
const { createRecord } = require('./utils/createRecord');

/**
 * Route that does calculation, writes them to DB and sends response with result
 * @param {Object} req - req object which is provided by expess
 * @param {Object} res - res object which is provided by expess
 */
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
