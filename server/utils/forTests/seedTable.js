const { createRecord } = require('./../../routes/calc/utils/createRecord');
const { fibonacci } = require('./../fibonacci');

const ip = '::ffff:127.0.0.1';

const numbersToCalc = [0, 1, 2, 3, 4, 5, 6, 10, 15, 100, 1476];
const resToCompare = {
  firstPage: [1, 1, 2, 3, 5, 8, 55, 610, 354224848179262000000, 1.3069892237633987e+308],
  secondPage: [0],
};

function seedTable(con, done) {
  numbersToCalc.forEach((number, i) => {
    if ((i + 1) === numbersToCalc.length) return createRecord(con, { ip, number, result: fibonacci(number) }, done);
    return createRecord(con, { ip, number, result: fibonacci(number) });
  });
}

module.exports = {
  seeds: {
    numbersToCalc,
    resToCompare,
  },
  seedTable,
};
