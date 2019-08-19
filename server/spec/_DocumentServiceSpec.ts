import Account from '../../src/app/shared/model/account.model';
import {insertDocuments} from '../services/DocumentService';
import {Candidate, Gender} from '../../src/app/shared/model/pageant-procedure/candidate.model';
import {Criteria, Procedure} from '../../src/app/shared/model/pageant-procedure/procedure.model';
import AccountSecurity from '../../src/app/shared/model/account-security.model';
import {Judge} from '../../src/app/shared/model/pageant-procedure/judge.model';
const faker = require('faker');

describe('_DocumentControllerSpec', function () {

    it('should insert a document for each system type. (This creates the necessary collections in the DB)', async function () {

        const email = faker.internet.email();
        const newAccount = new Account(email, faker.name.lastName(), faker.name.firstName());

        const docs = [
            newAccount,
            new Judge()
        ];

        const toInsert = [];
        for (const doc of docs) {
            toInsert.push(doc);
            toInsert.push({
                systemHeader: {
                    type: doc.systemHeader.type + '.archive'
                }
            });
        }

        const createdAccount = await insertDocuments(toInsert, null, newAccount.documentId);

    });
});
