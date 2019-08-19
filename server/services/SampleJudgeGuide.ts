import {Judge} from '../../src/app/shared/model/pageant-procedure/judge.model';
import {Candidate, Gender, RankingStage} from '../../src/app/shared/model/pageant-procedure/candidate.model';
import {addCandidatesToJudges} from './pss/Candidate.service';
import * as DocumentService from './DocumentService';

const faker = require('faker');

export module SampleJudgeGuide {

    export async function createSampleJudgeGuide( username , userId ) {
        const judge = new Judge(username , 1);
        judge.userId = userId;

        const name = faker.name.findName();

        const candidate = new Candidate(name, 1 , Gender.Female, RankingStage.PRELIMINARY);

        await addCandidatesToJudges(candidate, [judge], userId);

        await DocumentService.insertDocuments(candidate, null, userId);

        return [judge];
    }
}


