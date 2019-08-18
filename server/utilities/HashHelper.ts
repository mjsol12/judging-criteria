const bycript = require('bcrypt-nodejs');

export function hash(data, salt?, progess?) {

  return new Promise((resolve, reject) => {
    bycript.hash(data, salt, progess, function (err, encypted) {
      if (!err) {
        resolve(encypted);
      } else {
        reject(err);
      }
    });
  });

}

export function compare(raw, encrypted) {

  return new Promise((resolve, reject) => {
    bycript.compare(raw, encrypted, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

}

