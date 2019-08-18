const faker = require('faker');
const AccountService = require('../services/AccountService');

module.exports = {

  createTestUser: async function (idSuffix) {

    const email = faker.internet.userName() + '' + Date.now();
    const password = faker.internet.password();
    await AccountService.register({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email,
      password,
      idSuffix
    });

    return AccountService.authenticate(email, password);
  }

};
