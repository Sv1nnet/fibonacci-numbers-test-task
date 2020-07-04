const { createResponse } = require('./utils/createResponse');

const history = (req, res) => {
  const con = req.mysqlCon;
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);

  try {
    const sql = `SELECT * FROM ${process.env.TABLE} WHERE ip = '${ip}'`;
    con.query(sql, (err, sqlResult) => {
      if (err) throw err;

      /*
      If there are no records in DB we skip this section and just
      send this default response
      */
      let response = {
        results: [],
        maxPages: 1,
        currentPage: 1,
      };

      if (sqlResult.length > 0) {
        response = createResponse(req, sqlResult);
      }

      res.json(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { history };
