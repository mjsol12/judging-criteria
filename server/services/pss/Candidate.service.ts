import * as DocumentService from '../DocumentService';
import {Candidate, RankingStage} from '../../../src/app/shared/model/pageant-procedure/candidate.model';
import {InvalidRequestError} from '../../utilities/Errors';
import {Judge} from '../../../src/app/shared/model/pageant-procedure/judge.model';

// https://www.w3resource.com/javascript-exercises/javascript-string-exercise-11.php
export function strCamelCase(str) {
    return str.replace(/\W+(.)/g, (match, chr) => {
        return  chr.toUpperCase();
    });
}

export function lowerCaseFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function iterateCriteria(candidate: Candidate, stage ) {
    const contestant = JSON.parse(JSON.stringify(candidate));

    if (stage.criteria && stage.criteria.length > 0) {
        for (const criteria of stage.criteria) {
            contestant[criteria.idName] = 0;
        }
    } else {
        const camelize = lowerCaseFirstLetter(strCamelCase(stage.title));
        contestant[camelize] = 0;
    }

    stage.candidates = stage.candidates.concat([contestant]);
}

export async function addCandidatesToJudges(candidate: Candidate, judges) {

    for (const judge of judges) {

        if (candidate.rankingStage === RankingStage.PRELIMINARY) {

            for (const stage of judge.methodology.preliminary) {
                iterateCriteria(candidate, stage);
            }
        }
        if (candidate.rankingStage === RankingStage.FINALROUND) {

            for (const stage of judge.methodology.finalRound) {
                iterateCriteria(candidate, stage);
            }
        }
        if (candidate.rankingStage === RankingStage.QAFINAL) {

            for (const stage of judge.methodology.questionAndAnswer) {
                iterateCriteria(candidate, stage);
            }
        }

        await DocumentService.updateDocument(judge, '1231230-123=1231230123Fcker');
    }

    return true;
}

export module RegisteredCandidateService {


    export async function findCandidates() {
        // get all pageant candidates
        return await DocumentService.find(Candidate, {});
    }

    export async function savePreliminaryCandidate(candidate: Candidate, userId): Promise<any> {
        const filter = {
            candidateNumber: candidate.candidateNumber,
            gender: candidate.gender,
            rankingStage: candidate.rankingStage,
        };
        const foundCandidates = await DocumentService.findOne(Candidate, filter);

        if (foundCandidates) {
            throw new InvalidRequestError('Candidate is already registered');
        }

        const judges = await DocumentService.find(Judge, {});

        await addCandidatesToJudges(candidate, judges);

        // if found candidate do return invalid already have the candidate number
        const insertCandidate = DocumentService.insertDocuments(candidate, null, '1231230-123=1231230123Fcker');

        return Promise.all([insertCandidate]);
    }
}



