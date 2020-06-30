const _ = require('lodash');

const ELEMENTS_ON_PAGE = 10;

const history = (req, res) => {
  const con = req.mysqlCon;
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);

  try {
    const sql = `SELECT * FROM ${process.env.TABLE} WHERE ip = '${ip}'`;
    con.query(sql, (err, sqlResult) => {
      if (err) throw err;

      let { p: page } = req.query;

      page = parseInt(page, 10);
      page = !Number.isNaN(page) && page > 0 ? page : 1;

      const spliceUpto = page * ELEMENTS_ON_PAGE;
      const spliceFrom = spliceUpto - ELEMENTS_ON_PAGE;

      const results = sqlResult.reverse().slice(spliceFrom, spliceUpto).map((result) => _.pick(result, ['id', 'number', 'result']));
      const maxPages = sqlResult.length > ELEMENTS_ON_PAGE
        ? (parseInt(sqlResult.length / ELEMENTS_ON_PAGE, 10) + 1)
        : 1;

      const response = {
        results,
        maxPages,
        currentPage: results.length > 0 ? page : maxPages,
      };
      res.json(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { history };
