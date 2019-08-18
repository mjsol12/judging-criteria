import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {RouterClient} from '../routes/router.model';

const env: any = environment;

const apiUrl = env.API_URL == null || env.production ? `${window.location.origin}/api` : env.API_URL;
const auth = `${apiUrl}/auth`;
const v1 = `${apiUrl}/v1`;

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    // account
    public loggedInAccount: Account = null;
    // constants
    public LOCALSTORAGE_KEY_USER_ID = 'userId';

    constructor(private router: Router, private http: HttpClient) { }

    // email and password or some other id and auth key
    login(authId, authKey) {
        return this.http.post<Account>(`${auth}/login`, {authId, authKey});
    }

    setLogin(account) {
        debugger
        this.loggedInAccount = account;
        localStorage.setItem(this.LOCALSTORAGE_KEY_USER_ID, account.documentId);
        return true;
    }

    logout(noRedirect?) {

        return this.http.get(`${auth}/logout`).subscribe(result => {
            this.postLogoutAction(noRedirect);
        }, err => {
            console.log('An error occurred at logout: ');
            console.log(err);
            this.postLogoutAction(noRedirect);
        });
    }

    postLogoutAction(noRedirect?) {
        if (!noRedirect) {
            this.router.navigate([RouterClient.LOGIN]);
        }

        this.loggedInAccount = null;
        localStorage.removeItem(this.LOCALSTORAGE_KEY_USER_ID);
    }
}
