import {insertDocuments} from '../services/DocumentService';
import {Score, Contestant, GENDER} from '../../src/app/shared/model/pp/score.model';
const faker = require('faker');

describe('_DocumentControllerSpec', function () {
    it('should insert a score model with contestant arrays', async function () {

        const newScore1 = new Score('judge_1', 1);
        const newScore2 = new Score('judge_2', 2);
        const newScore3 = new Score('judge_3', 3);

        const contestants = [
            new Contestant(GENDER.Female, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0, 0),
            new Contestant(GENDER.Male, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Female, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0),
            new Contestant(GENDER.Male, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0 , 0 , 0, 0)
        ];

        newScore1.contestants = contestants;
        newScore2.contestants = contestants;
        newScore3.contestants = contestants;
        const docs = [
            newScore1,
            newScore2,
            newScore3,
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

        await insertDocuments(toInsert, null, '1234-567-090');

    });
});
