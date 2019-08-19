import * as DocumentService from '../DocumentService';
import {Candidate} from '../../../src/app/shared/model/pageant-procedure/candidate.model';
import {Judge} from '../../../src/app/shared/model/pageant-procedure/judge.model';
import {InvalidRequestError, NotFoundError} from '../../utilities/Errors';

export module JudgeService {
    export async function findJudge(userId) {
        // return the assigned judge data module
        return await DocumentService.findOne(Judge, {userId});
    }

    export async function saveCandidateData(candidate: Candidate, userId): Promise<any> {
        // if found candidate do return invalid already have the candidate number
        return await DocumentService.insertDocuments(candidate, null, userId);
    }

}

