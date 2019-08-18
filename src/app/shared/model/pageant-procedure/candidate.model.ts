import {SystemDocument} from '../system-document.model';

export enum Gender {
    Male = 'male',
    Female = 'female',
}

export class Candidate extends SystemDocument {
    constructor(public fullname: string, public candidateNumber: number, public gender: Gender) {
        super('Candidate');
    }
}
