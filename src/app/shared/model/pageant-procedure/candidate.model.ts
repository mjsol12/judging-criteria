import {SystemDocument} from '../system-document.model';

export enum Gender {
    Male = 'male',
    Female = 'female',
}
export enum RankingStage {
    PRELIMINARY = 'Preliminary',
    FINALROUND = 'Final Round',
    QAFINAL = 'Final Question and Answer',
}
export class Candidate extends SystemDocument {
    constructor(
        public fullname?: string,
        public candidateNumber?: number,
        public gender?: Gender ,
        public rankingStage?: RankingStage) {
        super('Candidate');
    }
}
