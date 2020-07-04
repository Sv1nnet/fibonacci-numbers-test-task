const { expect } = require('chai');
const { describe, it } = require('mocha');
const { fibonacci } = require('../fibonacci');

describe('Fibonacci function', () => {
  it('Should return currect number', (done) => {
    const resToCompare = [0, 1, 1, 2, 3, 5, 8, 55, 610, 354224848179262000000, 1.3069892237633987e+308];
    const results = [0, 1, 2, 3, 4, 5, 6, 10, 15, 100, 1476].map((n) => fibonacci(n));

    results.forEach((res, i) => { expect(res).equals(resToCompare[i]); });
    done();
  });

  it('Should throw an error if argument is not a number type', (done) => {
    expect(() => fibonacci('asd')).to.throw('Provided argument is not a number type');
    done();
  });

  it('Should throw an error if argument is NaN', (done) => {
    expect(() => fibonacci(NaN)).to.throw('Provided argument is NaN');
    done();
  });

  it('Should throw an error if argument is greated than max number (1476)', (done) => {
    const maxNumber = 1476;
    expect(() => fibonacci(maxNumber + 1)).to.throw(`Provided number is too big. The biggest number is ${maxNumber}`);
    done();
  });

  it('Should throw an error if argument is less than 0', (done) => {
    expect(() => fibonacci(-10)).to.throw('Provided number can\'t be less than zero');
    done();
  });
});
