import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import Account from '../model/account.model';
import {ToastrService} from 'ngx-toastr';
import {RouterClient} from '../routes/router.model';

@Injectable()
export class AuthenticationService {

  // account
  public loggedInAccount: Account = null;
  // constants
  public LOCALSTORAGE_KEY_USER_ID = 'userId';

  constructor(
    private router: Router,
    private api: ApiService,
    private toastrService: ToastrService
  ) {

    const storedId = localStorage.getItem(this.LOCALSTORAGE_KEY_USER_ID);
    // no account is logged in
    if (!storedId) {
      return;
    }
    // set id immediately so that services looking up to it is immediately informed that there's a logged in user
    this.login({
      documentId: storedId,
      // set as verified first so that it will redirect to the page immediately. after actual login check, this status is corrected.
      systemHeader: {
        accountVerified: true,
        temporaryAccount: true
      }
    });

    this.loginCheck().then();
  }

  async loginCheck() {

    try {
      const user = await this.api.loggedIn().toPromise();
      this.login(user);
    } catch (err) {
      if (err.status === 401) { // if session expired login again
        this.toastrService.warning('Please login again.', 'Session Expired');
        this.logout();
      }
    }

  }

  login(account) {
    this.loggedInAccount = account;
    localStorage.setItem(this.LOCALSTORAGE_KEY_USER_ID, account.documentId);
  }

  logout(noRedirect?) {
    this.api.logout().subscribe(result => {
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

  isLoggedIn(noRedirectIfLoggedOut?) {
    const loggedIn = this.loggedInAccount && this.loggedInAccount.documentId != null;
    if (!loggedIn) {
      this.logout(noRedirectIfLoggedOut);
    }
    return loggedIn;
  }

  isAuthenticated(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) {
    this.loginCheck().then(() => {
      this.redirectIfUnverified();
    });
    return this.isLoggedIn();
  }

  redirectIfUnverified() {
    if (!this.loggedInAccount) {
      return;
    }
    const verified = this.loggedInAccount.systemHeader.accountVerified;
    if (!verified) {
      this.router.navigate([RouterClient.LOGIN]);
    }
  }
}
