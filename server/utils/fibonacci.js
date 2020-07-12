/**
 * Find Fibonacci number
 * @param {number} number - number for calculation
 * @returns {number}
 */
const fibonacci = (number) => {
  const maxNumber = 1476;
  if (typeof number !== 'number') throw new Error('Provided argument is not a number type');
  if (Number.isNaN(number)) throw new Error('Provided argument is NaN');
  if (number > maxNumber) throw new Error(`Provided number is too big. The biggest number is ${maxNumber}`);
  if (number < 0) throw new Error('Provided number can\'t be less than zero');

  // Memoize results
  if (!fibonacci.results) fibonacci.results = {};
  if (fibonacci.results[number]) return fibonacci.results[number];

  let prev = 0;
  let cur = 1;
  let temp = prev;

  if (number === prev) return prev;
  if (number === cur) return cur;

  for (let i = 2; i <= number; i += 1) {
    temp = cur;
    cur = prev + cur;
    prev = temp;

    fibonacci.results[number] = cur;
  }

  return cur;
};

module.exports = { fibonacci };
