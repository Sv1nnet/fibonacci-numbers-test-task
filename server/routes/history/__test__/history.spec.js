const { expect } = require('chai');
const { beforeEach, describe, it } = require('mocha');
const request = require('supertest');
const { appPromise } = require('../../../index');
const { createNewTestTable } = require('./../../../utils/forTests/createNewTestTable');
const { seedTable, seeds } = require('./../../../utils/forTests/seedTable');

const { numbersToCalc, resToCompare } = seeds;

let appListening = null;
let connection = null;

// Clean the test DB
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

describe('History function', () => {
  it('Should return currect results for the first page', (done) => {
    request(appListening)
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
    request(appListening)
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
    request(appListening)
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
    request(appListening)
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
