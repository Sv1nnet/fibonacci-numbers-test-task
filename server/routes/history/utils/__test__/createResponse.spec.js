const { expect } = require('chai');
const { beforeEach, describe, it } = require('mocha');
const { createResponse } = require('../createResponse');
const { appPromise } = require('../../../../index');
const { createRecord } = require('../../../calc/utils/createRecord');
const { fibonacci } = require('../../../../utils/fibonacci');

const { TEST_DATABASE: database, TABLE: table } = process.env;
const ip = '::ffff:127.0.0.1';
const numbersToCalc = [0, 1, 2, 3, 4, 5, 6, 10, 15, 100, 1476];
const resToCompare = {
  firstPage: [1, 1, 2, 3, 5, 8, 55, 610, 354224848179262000000, 1.3069892237633987e+308],
  secondPage: [0],
};

appPromise.then(({ con }) => {
  beforeEach((done) => {
    con.query(`DROP TABLE ${table}`, (err) => {
      if (err) throw err;

      con.query(`CREATE table IF NOT EXISTS ${database}.${table} (id INT AUTO_INCREMENT PRIMARY KEY, ip VARCHAR(255), number INT, result VARCHAR(255), date DATETIME)`, (err) => {
        if (err) throw err;

        numbersToCalc.forEach((number, i) => {
          if ((i + 1) === numbersToCalc.length) return createRecord(con, { ip, number, result: fibonacci(number) }, done);
          return createRecord(con, { ip, number, result: fibonacci(number) });
        });
      });
    });
  });

  describe('Test createResponse function', () => {
    it('Should return results with: length: 10, maxPages: 2, currentPage: 1', (done) => {
      const sql = `SELECT * FROM ${process.env.TABLE} WHERE ip = '${ip}'`;

      con.query(sql, (err, sqlResult) => {
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

      con.query(sql, (err, sqlResult) => {
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

      con.query(sql, (err, sqlResult) => {
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
});
