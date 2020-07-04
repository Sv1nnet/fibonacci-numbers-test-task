const { expect } = require('chai');
const { beforeEach, describe, it } = require('mocha');
const request = require('supertest');
const { appPromise } = require('../../../index');
const { createRecord } = require('../../calc/utils/createRecord');
const { fibonacci } = require('../../../utils/fibonacci');

const { TEST_DATABASE: database, TABLE: table } = process.env;
const ip = '::ffff:127.0.0.1';
const numbersToCalc = [0, 1, 2, 3, 4, 5, 6, 10, 15, 100, 1476];
const resToCompare = {
  firstPage: [1, 1, 2, 3, 5, 8, 55, 610, 354224848179262000000, 1.3069892237633987e+308],
  secondPage: [0],
};

appPromise.then(({ app, con }) => {
  // Clean the test DB
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

  describe('History function', () => {
    it('Should return currect results for the first page', (done) => {
      request(app)
        .get('/history')
        .send()
        .expect(200)
        .expect((res) => {
          const { results } = res.body;
          expect(results.length).equals(10);

          results.reverse().forEach((rec, i) => {
            expect(rec.number).equals(numbersToCalc[i + 1]);
            expect(rec.result).equals(resToCompare.firstPage[i].toString());
          });
        })
        .end((err) => {
          if (err) return done(err);

          return done();
        });
    });

    it('Should return currect results for the second page', (done) => {
      request(app)
        .get('/history?p=2')
        .send()
        .expect(200)
        .expect((res) => {
          const { results } = res.body;
          expect(results.length).equals(1);

          results.reverse().forEach((rec, i) => {
            expect(rec.number).equals(numbersToCalc[0]);
            expect(rec.result).equals(resToCompare.secondPage[i].toString());
          });
        })
        .end((err) => {
          if (err) return done(err);

          return done();
        });
    });

    it('Should return currect results if a page in url query doesn\'t exist', (done) => {
      request(app)
        .get('/history?p=5')
        .send()
        .expect(200)
        .expect((res) => {
          const { results } = res.body;
          expect(results.length).equals(1);

          results.reverse().forEach((rec, i) => {
            expect(rec.number).equals(numbersToCalc[0]);
            expect(rec.result).equals(resToCompare.secondPage[i].toString());
          });
        })
        .end((err) => {
          if (err) return done(err);

          return done();
        });
    });

    it('Should return currect results if a page in url query is not a number', (done) => {
      request(app)
        .get('/history?p=asd')
        .send()
        .expect(200)
        .expect((res) => {
          const { results } = res.body;
          expect(results.length).equals(10);

          results.reverse().forEach((rec, i) => {
            expect(rec.number).equals(numbersToCalc[i + 1]);
            expect(rec.result).equals(resToCompare.firstPage[i].toString());
          });
        })
        .end((err) => {
          if (err) return done(err);

          return done();
        });
    });
  });
});
