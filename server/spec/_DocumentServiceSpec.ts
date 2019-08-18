import Account from '../../src/app/shared/model/account.model';
import {insertDocuments} from '../services/DocumentService';
import {Candidate, Gender} from '../../src/app/shared/model/pageant-procedure/candidate.model';
import {Criteria, Procedure} from '../../src/app/shared/model/pageant-procedure/procedure.model';
import AccountSecurity from '../../src/app/shared/model/account-security.model';
const faker = require('faker');

describe('_DocumentControllerSpec', function () {

    it('should insert a document for each system type. (This creates the necessary collections in the DB)', async function () {

        const email = faker.internet.email();
        const newAccount = new Account(email, faker.name.lastName(), faker.name.firstName());

        const newProcedure = new Procedure('Question and Answer', 50);

        const criteria1 = new Criteria('Content', 'relevance', 50);
        const criteria2 = new Criteria('Conceptualization of thoughts', 'Delivery and choice of word', 40);
        const criteria3 = new Criteria('Impact', '', 10);

        const criteria = [];

        criteria.push(criteria1, criteria2, criteria3);

        newProcedure.criteria = criteria;

        const docs = [
            newAccount,
            new AccountSecurity(newAccount.documentId),
            new Candidate('Mark Jones Solano' , 1, Gender.Male),
            newProcedure
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
