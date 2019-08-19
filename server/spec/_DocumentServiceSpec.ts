import Account from '../../src/app/shared/model/account.model';
import {insertDocuments} from '../services/DocumentService';
import {Judge} from '../../src/app/shared/model/pageant-procedure/judge.model';
import AccountService from '../services/AccountService';
const faker = require('faker');

describe('_DocumentControllerSpec', function () {
    it('should create new account with judge module', async function () {
        const params = {firstname: faker.name.firstName(), lastname: faker.name.lastName(), username: 'user1', password: 'user1'};
        await AccountService.register(params, {});
    });

    // it('should insert a document for each system type. (This creates the necessary collections in the DB)', async function () {
    //
    //     const email = faker.internet.email();
    //     const newAccount = new Account(email, faker.name.lastName(), faker.name.firstName());
    //
    //     const newJudge = new Judge();
    //     newJudge.userId = newAccount.documentId;
    //
    //     newAccount.judgeModuleId = newJudge.documentId;
    //
    //     const docs = [
    //         newAccount,
    //         newJudge
    //     ];
    //
    //     const toInsert = [];
    //     for (const doc of docs) {
    //         toInsert.push(doc);
    //         toInsert.push({
    //             systemHeader: {
    //                 type: doc.systemHeader.type + '.archive'
    //             }
    //         });
    //     }
    //
    //     await insertDocuments(toInsert, null, newAccount.documentId);
    //
    // });
});
