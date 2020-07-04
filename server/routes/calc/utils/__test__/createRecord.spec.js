const { expect } = require('chai');
const { beforeEach, describe, it } = require('mocha');
const { appPromise } = require('../../../../index');
const { createRecord } = require('../createRecord');
const { fibonacci } = require('../../../../utils/fibonacci');

const { TEST_DATABASE: database, TABLE: table } = process.env;

appPromise.then(({ con }) => {
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

  describe('Create record test', () => {
    it('Should craete a record in DB', (done) => {
      const ip = '192.168.0.15';
      const number = 17;
      const result = fibonacci(17);

      createRecord(
        con,
        { ip, number, result },
        () => {
          const sql = `SELECT * FROM ${table} WHERE ip = '${ip}'`;
          con.query(sql, (err, sqlResult) => {
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
      const number = 17;
      const result = fibonacci(17);

      expect(() => createRecord(con, { number, result })).to.throw('Ip is not provided');
      done();
    });

    it('Should throw error if ip is not a string type', (done) => {
      const ip = 128;
      const number = 17;
      const result = fibonacci(17);

      expect(() => createRecord(con, { ip, number, result })).to.throw('Ip should be a string type');
      done();
    });

    it('Should throw error if ip has incorrect format', (done) => {
      const ip = 'asd.213.231.12.321.a';
      const number = 17;
      const result = fibonacci(17);

      expect(() => createRecord(con, { ip, number, result })).to.throw('Ip has incorrect format');
      done();
    });

    it('Should throw error if number is undefined', (done) => {
      const ip = '192.168.0.15';
      const result = fibonacci(17);

      expect(() => createRecord(con, { ip, result })).to.throw('Number is not provided');
      done();
    });

    it('Should throw error if number is not a number type', (done) => {
      const ip = '192.168.0.15';
      const result = fibonacci(17);
      const number = 'asd';

      expect(() => createRecord(con, { ip, number, result })).to.throw('Number is not a number type');
      done();
    });

    it('Should throw error if number is NaN', (done) => {
      const ip = '192.168.0.15';
      const result = fibonacci(17);
      const number = NaN;

      expect(() => createRecord(con, { ip, number, result })).to.throw('Number is NaN type');
      done();
    });

    it('Should throw error if result is undefined', (done) => {
      const ip = '192.168.0.15';
      const number = 17;

      expect(() => createRecord(con, { ip, number })).to.throw('Result is not provided');
      done();
    });

    it('Should throw error if result is not a number type', (done) => {
      const ip = '192.168.0.15';
      const number = 17;
      const result = 'asd';

      expect(() => createRecord(con, { ip, number, result })).to.throw('Result is not a number type');
      done();
    });

    it('Should throw error if result is NaN', (done) => {
      const ip = '192.168.0.15';
      const number = 17;
      const result = NaN;

      expect(() => createRecord(con, { ip, number, result })).to.throw('Result is NaN type');
      done();
    });
  });
});
