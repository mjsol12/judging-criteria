import AccountService from '../services/AccountService';
const LocalStrategy = require('passport-local').Strategy;

async function localAuth(authId, authKey) {
  return await AccountService.authenticate(authId, authKey);
}

module.exports = function (passport) {

  passport.serializeUser(function (deSerializedUser, done) {
    done(null, deSerializedUser);
  });

  passport.deserializeUser(function (serializedUser, done) {
    done(null, serializedUser);
  });

  passport.use(new LocalStrategy({
      usernameField: 'authId',
      passwordField: 'authKey',
      // passReqToCallback: true,
      // session: false
    },
    function (username, password, done) {
      localAuth(username, password).then((user) => {
        done(null, user);
      }).catch(() => {
        done();
      });
    }
  ));

};
