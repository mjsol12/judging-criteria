const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'smis_user_default',
  password: 'BEDsmis123@ferv0r',
  database: 'smis_bedtest'
});

function query(query$, params) {
  return new Promise((resolve, reject) => {
    pool.query(query$, params, function (error, results) {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

module.exports = {

  query,
  queryOne: async (queryStr, params) => {
    const result: any = await query(queryStr, params);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }

};


