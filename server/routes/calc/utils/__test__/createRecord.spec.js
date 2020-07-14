const { expect } = require('chai');
const { beforeEach, describe, it } = require('mocha');
const { appPromise } = require('../../../../index');
const { createRecord } = require('../createRecord');
const { fibonacci } = require('../../../../utils/fibonacci');
const { createNewTestTable } = require('../../../../utils/forTests/createNewTestTable');

const { TABLE: table, IP: ip } = process.env;
const number = 17;

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

describe('Create record test', () => {
  it('Should craete a record in DB', (done) => {
    const result = fibonacci(number);

    createRecord(
      connection,
      { ip, number, result },
      () => {
        const sql = `SELECT * FROM ${table} WHERE ip = '${ip}'`;
        connection.query(sql, (err, sqlResult) => {
          if (err) return done(err);

          expect(sqlResult[0].ip).equals(ip);
          expect(sqlResult[0].number).equals(number);
          expect(sqlResult[0].result).equals(result.toString());
          return done();
        });
      },
    );
  });

  it('Should throw error if ip is not provided', (done) => {
    const result = fibonacci(number);

    expect(() => createRecord(connection, { number, result })).to.throw('Ip is not provided');
    done();
  });

  it('Should throw error if ip is not a string type', (done) => {
    const wrongIpFormat = 128;
    const result = fibonacci(number);

    expect(() => createRecord(connection, { ip: wrongIpFormat, number, result })).to.throw('Ip should be a string type');
    done();
  });

  it('Should throw error if ip has incorrect format', (done) => {
    const wrongIpFormat = 'asd.213.231.12.321.a';
    const result = fibonacci(number);

    expect(() => createRecord(connection, { ip: wrongIpFormat, number, result })).to.throw('Ip has incorrect format');
    done();
  });

  it('Should throw error if number is undefined', (done) => {
    const result = fibonacci(17);

    expect(() => createRecord(connection, { ip, result })).to.throw('Number is not provided');
    done();
  });

  it('Should throw error if number is not a number type', (done) => {
    const result = fibonacci(17);
    const wrongTypedNumber = 'asd';

    expect(() => createRecord(connection, { ip, number: wrongTypedNumber, result })).to.throw('Number is not a number type');
    done();
  });

  it('Should throw error if number is NaN', (done) => {
    const result = fibonacci(17);
    const wrongTypedNumber = NaN;

    expect(() => createRecord(connection, { ip, number: wrongTypedNumber, result })).to.throw('Number is NaN type');
    done();
  });

  it('Should throw error if result is undefined', (done) => {
    expect(() => createRecord(connection, { ip, number })).to.throw('Result is not provided');
    done();
  });

  it('Should throw error if result is not a number type', (done) => {
    const result = 'asd';

    expect(() => createRecord(connection, { ip, number, result })).to.throw('Result is not a number type');
    done();
  });

  it('Should throw error if result is NaN', (done) => {
    const result = NaN;

    expect(() => createRecord(connection, { ip, number, result })).to.throw('Result is NaN type');
    done();
  });
});
