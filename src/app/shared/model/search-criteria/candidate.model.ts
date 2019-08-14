import {SystemDocument} from '../system-document.model';

export class Candidate extends SystemDocument {
    constructor(public fullname: string, public candidateNumber: number) {
        super('Candidate');
    }
}
