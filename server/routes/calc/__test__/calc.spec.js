const { expect } = require('chai');
const { beforeEach, describe, it } = require('mocha');
const request = require('supertest');
const { appPromise } = require('../../../index');

const { TEST_DATABASE: database, TABLE: table } = process.env;

appPromise.then(({ app, con }) => {
  // Clean the test DB
  beforeEach((done) => {
    con.query(`DROP TABLE ${table}`, (err) => {
      if (err) throw err;

      con.query(`CREATE table IF NOT EXISTS ${database}.${table} (id INT AUTO_INCREMENT PRIMARY KEY, ip VARCHAR(255), number INT, result VARCHAR(255), date DATETIME)`, (createTableErr) => {
        if (createTableErr) throw createTableErr;

        done();
      });
    });
  });

  describe('Calc function', () => {
    it('Should return currect number and select sent number from DB', (done) => {
      const resToCompare = [0, 1, 1, 2, 3, 5, 8, 55, 610, 354224848179262000000, 1.3069892237633987e+308];
      const numbersToCalc = [0, 1, 2, 3, 4, 5, 6, 10, 15, 100, 1476];

      Promise.all(
        numbersToCalc.map((n, i) => request(app)
          .post('/calc')
          .send({ number: n })
          .expect(200)
          .expect((res) => {
            expect(res.body).equals(resToCompare[i]);
            const sql = `SELECT * FROM ${table} WHERE ip = '::ffff:127.0.0.1'`;
            con.query(sql, (selectErr, result) => {
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
      request(app)
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
      request(app)
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
      request(app)
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
});
