const { expect } = require('chai');
const { beforeEach, describe, it } = require('mocha');
const request = require('supertest');
const { appPromise } = require('../../../index');
const { createNewTestTable } = require('../../../utils/forTests/createNewTestTable');

const { TABLE: table } = process.env;
const resToCompare = [0, 1, 1, 2, 3, 5, 8, 55, 610, 354224848179262000000, 1.3069892237633987e+308];
const numbersToCalc = [0, 1, 2, 3, 4, 5, 6, 10, 15, 100, 1476];

let appListening = null;
let connection = null;

// Clean the test DB
beforeEach(function (done) {
  this.timeout(10000);
  if (!appListening) {
    appPromise.then(({ app, con }) => {
      appListening = app;
      connection = con;

      createNewTestTable(con, done);
    });
  } else {
    createNewTestTable(connection, done);
  }
});

describe('Calc function', () => {
  it('Should return currect number and select sent number from DB', (done) => {
    Promise.all(
      numbersToCalc.map((n, i) => request(appListening)
        .post('/calc')
        .send({ number: n })
        .expect(200)
        .expect((res) => {
          expect(res.body).equals(resToCompare[i]);
          const sql = `SELECT * FROM ${table} WHERE ip = '::ffff:127.0.0.1'`;
          connection.query(sql, (selectErr, result) => {
            if (selectErr) throw selectErr;
            if (!result) throw new Error('Could not to find any record with provided ip');

            expect(result[i].number).equals(numbersToCalc[i]);
            expect(result[i].result).equals(resToCompare[i].toString());
            expect(result[i].date).to.not.equals('');
            expect(result[i].date).to.not.equals(undefined);

            if (i === (numbersToCalc.length - 1)) done();
          });
        })),
    )
      .catch((err) => done(err));
  });

  it('Should return status 400 and error message if number is not a number type', (done) => {
    request(appListening)
      .post('/calc')
      .send({ number: 'n' })
      .expect(400)
      .expect((res) => {
        expect(res.body).equals('Provided argument is not a number type');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('Should return status 400 and error message if number is greated than max number (1476)', (done) => {
    request(appListening)
      .post('/calc')
      .send({ number: 1800 })
      .expect(400)
      .expect((res) => {
        expect(res.body).equals('Provided number is too big. The biggest number is 1476');
      })
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });

  it('Should return status 400 and error message if number is less than 0', (done) => {
    request(appListening)
      .post('/calc')
      .send({ number: -10 })
      .expect(400)
      .expect((res) => {
        expect(res.body).equals('Provided number can\'t be less than zero');
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
