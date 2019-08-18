import {SystemDocument} from '../system-document.model';

export class Criteria {
    public score?: number;
    constructor(public shortName: string, public description: string, public weight: number) {
    }
}

export class Procedure extends SystemDocument {

    public totalScore: number;
    public criteria: Criteria[] = [];

    constructor(public title: string, public weight: number) {
        super('Procedure');
    }
}

