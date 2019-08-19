import * as DocumentService from '../DocumentService';
import {Candidate} from '../../../src/app/shared/model/pageant-procedure/candidate.model';
import {Score} from '../../../src/app/shared/model/pp/score.model';
import {InvalidRequestError} from '../../utilities/Errors';

export module SearchService {
    export async function findScoreModule(userId) {
        const filter = {
            'userId' : userId
        };
        // return the assigned judge data module
        return await DocumentService.findOne(Score, filter);
    }

    export async function saveScores(score: Score, userId): Promise<any> {
        if (score.userId !== userId) {
            throw new InvalidRequestError('userId does not much to document.userId');
        }
        // if found candidate do return invalid already have the candidate number
        return await DocumentService.updateDocument(score, null, userId);
    }

}

