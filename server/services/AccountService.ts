import AccountSecurity from '../../src/app/shared/model/account-security.model';
import Account from '../../src/app/shared/model/account.model';
import {compare, hash} from '../utilities/HashHelper';
import {v4 as uuid} from 'uuid';
import Logger from '../utilities/Logger';
import {InvalidRequestError, UnauthorizedError} from '../utilities/Errors';

const fs = require('fs');
const DocumentService = require('./DocumentService');

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/

async function emailExists(email) {
  const count = await DocumentService.count(Account, {email: new RegExp(email, 'i')});
  return count > 0;
}

export default class AccountService {

  public static authenticate = async (id, authKey) => {
    // id is either username, email, mobileNo, telNo, or social media account id
    const query = {
      $or: [
        {authenticationId: id},
        {mobileNo: id},
        {email: id},
        {username: new RegExp(id, 'i')},
        {telNo: id}
      ]
    };
    const foundAccount = await DocumentService.findOne(Account, query);
    // find account security
    if (!foundAccount) {
      throw new UnauthorizedError('Invalid credentials.');
    }
    const accSecQuery = {
      accountId: foundAccount.documentId
    };

    const accountSecurity: AccountSecurity = await DocumentService.findOne(AccountSecurity, accSecQuery);
    const passMatched = await compare(authKey, accountSecurity.authKey);

    if (!passMatched) {
      const tempPassMatched = accountSecurity.temporaryPassword && await compare(authKey, accountSecurity.temporaryPassword);
      if (!tempPassMatched) {
        throw new UnauthorizedError('Invalid credentials.');
      }
    }

    return foundAccount;

  };

  public static async register(params, req) {
    // registration parameters
    const {firstname, lastname, username, password} = params; // idSuffix is for tests only
    // checks
    if (!firstname.length || firstname.length === 0) {
      throw new InvalidRequestError('Invalid first name value.');
    }
    // checks
    if (!lastname.length || lastname.length === 0) {
      throw new InvalidRequestError('Invalid last name value.');
    }
    // check
    // create initial documents
    const account = new Account(username, lastname, firstname);
    const accountSecurity = new AccountSecurity(account.documentId, <string>await hash(password));

    account.username = username;
      // do insert
    const toInsert = [account, accountSecurity];
    await DocumentService.insertDocuments(toInsert, null, account.documentId);
  };

  public static getAccountById = (documentId, options?) => {
    return DocumentService.findOne(Account, {documentId}, options);
  };

  public static searchAccount = (key, projection, limit, skip) => {
    key = key ? key.trim() : '';
    const regex = new RegExp(key, 'i');
    const filter = {
      $or: [
        {username: regex},
        {email: regex}
      ]
    };

    const defaultProjection = {
      lastname: 1,
      firstname: 1,
      username: 1,
      documentId: 1,
      thumbnailImage: 1,
      'systemHeader.createdOn': 1
    };

    projection = projection ? projection : defaultProjection;
    limit = limit ? limit : 50;

    return DocumentService.find(
      Account,
      filter,
      {
        sort: {'lastname': 1, 'firstname': 1},
        projection,
        limit,
        skip
      }
    );
  };
};
