const _ = require('lodash');

const ELEMENTS_ON_PAGE = 10;

/**
 * Create response with history data
 * @param {Object} req - req object which is provided by expess
 * @param {Object} sqlResult - req object which is provided by expess
 * @returns {{
 *  results: { id: number, number: number, result: string }[],
 *  maxPages: number,
 *  currentPage: number,
 * }}
 */
const createResponse = (req, sqlResult) => {
  let { p: page } = req.query;

  page = parseInt(page, 10);
  page = !Number.isNaN(page) && page > 0 ? page : 1;

  let sliceUpto = page * ELEMENTS_ON_PAGE;
  let sliceFrom = sliceUpto - ELEMENTS_ON_PAGE;

  /*
  While we can't get any records by spliceFrom
  and spliceUpto indexes we should find these
  indexes for the last portion of records
  */
  while (!sqlResult[sliceFrom]) {
    sliceFrom -= ELEMENTS_ON_PAGE;
    sliceUpto -= ELEMENTS_ON_PAGE;
    page -= 1;
  }

  // Here we need to reverse results to get the latest records first
  const results = [...sqlResult].reverse().slice(sliceFrom, sliceUpto).map((result) => _.pick(result, ['id', 'number', 'result']));
  const maxPages = sqlResult.length > ELEMENTS_ON_PAGE
    ? (parseInt(sqlResult.length / ELEMENTS_ON_PAGE, 10) + 1)
    : 1;

  return {
    results,
    maxPages,
    currentPage: results.length > 0 ? page : maxPages,
  };
};

module.exports = { createResponse };
