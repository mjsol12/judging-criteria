import {insertDocuments} from '../services/DocumentService';
import {Score, Contestant, GENDER} from '../../src/app/shared/model/pp/score.model';

describe('_DocumentControllerSpec', function () {
    it('should insert a score model with contestant arrays', async function () {

        const newScore1 = new Score('judge_1', 1);
        const newScore2 = new Score('judge_2', 2);
        const newScore3 = new Score('judge_3', 3);

        const contestants = [
            new Contestant(GENDER.Female, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
            new Contestant(GENDER.Male, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
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
