import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {RouterClient} from '../routes/router.model';
import {Observable} from 'rxjs';
import {ServerRoutes} from './server-routes';

const env: any = environment;

const apiUrl = env.API_URL == null || env.production ? `${window.location.origin}/api` : env.API_URL;
const auth = `${apiUrl}/auth`;
const v1 = `${apiUrl}/v1`;

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private router: Router, private http: HttpClient) { }

    login(authId, authKey) {
        return this.http.post<Account>(`${auth}/login`, {authId, authKey});
    }
    // logout function
    logout() {
        return this.http.get(`${auth}/logout`);
    }

    loggedIn(): Observable<any> {
        return this.http.get<any>(`${auth}${ServerRoutes.LOGGED_IN}`);
    }

    signup(schoolName, firstname, lastname, email, region, username, password) {
        return this.http.post(`${auth}/signup`, {schoolName, firstname, lastname, email, region, username, password});
    }

}
