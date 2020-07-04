const { expect } = require('chai');
const { beforeEach, describe, it } = require('mocha');
const { createResponse } = require('../createResponse');
const { appPromise } = require('../../../../index');
const { createNewTestTable } = require('../../../../utils/forTests/createNewTestTable');
const { seedTable, seeds } = require('../../../../utils/forTests/seedTable');
const { numbersToCalc, resToCompare } = seeds;

const ip = '::ffff:127.0.0.1';

let appListening = null;
let connection = null;

beforeEach(function (done) {
  this.timeout(10000);
  if (!appListening) {
    appPromise.then(({ app, con }) => {
      appListening = app;
      connection = con;

      createNewTestTable(con, done, seedTable);
    });
  } else {
    createNewTestTable(connection, done, seedTable);
  }
});

describe('Test createResponse function', () => {
  it('Should return results with: length: 10, maxPages: 2, currentPage: 1', (done) => {
    const sql = `SELECT * FROM ${process.env.TABLE} WHERE ip = '${ip}'`;

    connection.query(sql, (err, sqlResult) => {
      if (err) return done(err);

      const req = { query: { p: '1' } };
      const response = createResponse(req, sqlResult);
      const numbers = [...numbersToCalc].reverse();
      const results = [...resToCompare.firstPage].reverse();

      expect(response.maxPages).equals(2);
      expect(response.currentPage).equals(1);
      expect(response.results.length).equals(10);

      response.results.forEach((res, i) => {
        expect(res.number).equals(numbers[i]);
        expect(res.result).equals(results[i].toString());
      });

      return done();
    });
  });

  it('Should return results with: length: 1, maxPages: 2, currentPage: 2; for p == 2', (done) => {
    const sql = `SELECT * FROM ${process.env.TABLE} WHERE ip = '${ip}'`;

    connection.query(sql, (err, sqlResult) => {
      if (err) return done(err);

      const req = { query: { p: '2' } };
      const response = createResponse(req, sqlResult);
      const numbers = [...numbersToCalc].reverse();
      const results = [...resToCompare.secondPage].reverse();

      expect(response.maxPages).equals(2);
      expect(response.currentPage).equals(2);
      expect(response.results.length).equals(1);

      response.results.forEach((res) => {
        expect(res.number).equals(numbers[10]);
        expect(res.result).equals(results[0].toString());
      });

      return done();
    });
  });

  it('Should return results with: length: 10, maxPages: 2, currentPage: 1; for p is not a number value', (done) => {
    const sql = `SELECT * FROM ${process.env.TABLE} WHERE ip = '${ip}'`;

    connection.query(sql, (err, sqlResult) => {
      if (err) return done(err);

      const req = { query: { p: 'asd' } };
      const response = createResponse(req, sqlResult);
      const numbers = [...numbersToCalc].reverse();
      const results = [...resToCompare.firstPage].reverse();

      expect(response.maxPages).equals(2);
      expect(response.currentPage).equals(1);
      expect(response.results.length).equals(10);

      response.results.forEach((res, i) => {
        expect(res.number).equals(numbers[i]);
        expect(res.result).equals(results[i].toString());
      });

      return done();
    });
  });
});
