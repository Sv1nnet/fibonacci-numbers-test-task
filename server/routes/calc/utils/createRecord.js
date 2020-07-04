const ipRegexp = new RegExp(/^:{2}[A-Fa-f]{4}:((([0-9]{1,3})\.){3}([0-9]{1,3}))$|^((([0-9]{1,3})\.){3}([0-9]{1,3}))$/);

const createRecord = (con, { ip, number, result }, callback) => {
  if (!ip) throw new Error('Ip is not provided');
  if (typeof ip !== 'string') throw new Error('Ip should be a string type');
  if (!ip.match(ipRegexp)) throw new Error('Ip has incorrect format');

  if (number === undefined) throw new Error('Number is not provided');
  if (typeof number !== 'number') throw new Error('Number is not a number type');
  if (Number.isNaN(number)) throw new Error('Number is NaN type');

  if (result === undefined) throw new Error('Result is not provided');
  if (typeof result !== 'number') throw new Error('Result is not a number type');
  if (Number.isNaN(result)) throw new Error('Result is NaN type');

  const sql = `INSERT INTO ${process.env.TABLE} (ip, number, result, date) VALUES ('${ip}', ${number}, '${result}', now())`;

  con.query(sql, (err) => {
    if (err) throw err;

    if (callback) callback();
  });
};

module.exports = { createRecord };
