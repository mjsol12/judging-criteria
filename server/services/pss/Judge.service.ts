import * as DocumentService from '../DocumentService';
import {Candidate} from '../../../src/app/shared/model/pageant-procedure/candidate.model';
import {Procedure} from '../../../src/app/shared/model/pageant-procedure/procedure.model';


export module JudgeService {


    export async function findProcedure() {
        // get all pageant candidates
        const candidates = await DocumentService.find(Candidate, {});
        const procedures = await DocumentService.find(Procedure, {});

        const column = [];
        const data = [];

        for (const candidate of candidates) {
            const dataColumn = {};
            dataColumn.candidate = candidate.fullname;
            dataColumn[candidate.candidateNumber] = candidate.candidateNumber;
            dataColumn[candidate.gender] = candidate.gender;

            for (let procedure of procedures) {
                for (let criteria of procedure.criteria) {

                }
            }
        }

        return Promise.all([column, data]);
    }

}


export async function saveCandidateData(candidate: Candidate, userId): Promise<any> {
    // if found candidate do return invalid already have the candidate number
    return await DocumentService.insertDocuments(candidate, null, '1231230-123=1231230123Fcker');
}


