import {insertDocuments} from '../services/DocumentService';
import {Score, Contestant, GENDER} from '../../src/app/shared/model/pp/score.model';

describe('_DocumentControllerSpec', function () {
    it('should insert a score model with contestant arrays', async function () {

        const newScore1 = new Score('judge_1', 1);
        const newScore2 = new Score('judge_2', 2);
        const newScore3 = new Score('judge_3', 3);
        const newScore4 = new Score('judge_3', 4);
        const newScore5 = new Score('judge_3', 5);

        const contestants = [
            new Contestant(GENDER.Female, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Female, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Female, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Female, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Female, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Female, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Female, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Female, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        ];

        newScore1.contestants = contestants;
        newScore2.contestants = contestants;
        newScore3.contestants = contestants;
        newScore4.contestants = contestants;
        newScore5.contestants = contestants;
        const docs = [
            newScore1,
            newScore2,
            newScore3,
            newScore4,
            newScore5
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
