import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Candidate} from '../../model/pageant-procedure/candidate.model';
import {ServerRoutes} from '../server-routes';

const env: any = environment;

const apiUrl = env.API_URL == null || env.production ? `${window.location.origin}/api` : env.API_URL;
const v1 = `${apiUrl}/v1`;

@Injectable()
export class PageantApiService {

    constructor(private http: HttpClient) { }

    getProcedures() {
        // get all procedures
        return this.http.get(`${v1}${ServerRoutes.PROCEDURE}`);
    }

    getJudge() {
        // get all proceduresx
        return this.http.get<any>(`${v1}${ServerRoutes.JUDGE}`);
    }

    // school
    saveCandidate(candidate: Candidate) {
        // returns the user's school if no id specified
        return this.http.post<Candidate>(`${v1}${ServerRoutes.CANDIDATE}`, candidate);
    }
}
