import {SystemDocument} from '../system-document.model';

export class ScoreSummary extends SystemDocument {

    score?: number;
    constructor(public shortName: string, public description: string, public weight: number) {
        super('Criteria');
    }
}