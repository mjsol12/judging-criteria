import * as DocumentService from '../DocumentService';
import {Candidate} from '../../../src/app/shared/model/pageant-procedure/candidate.model';


export module RegisteredCandidateService {


    export async function findCandidates() {
        // get all pageant candidates
        return await DocumentService.find(Candidate, {});
    }


    export async function saveCandidateData(candidate: Candidate, userId): Promise<any> {
        // if found candidate do return invalid already have the candidate number
        return await DocumentService.insertDocuments(candidate, null, '1231230-123=1231230123Fcker');
    }
}



