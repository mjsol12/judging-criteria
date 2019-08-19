import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {RouterClient} from '../routes/router.model';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedIn = this.authService.isAuthenticated(route, state);
    if (!loggedIn) {
      return false;
    }
    const verified = this.authService.loggedInAccount.systemHeader.accountVerified;
    if (!verified) {
      this.router.navigate([RouterClient.LOGIN]);
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedIn = this.authService.isAuthenticated(route, state);
    if (!loggedIn) {
      return false;
    }
    const verified = this.authService.loggedInAccount.systemHeader.accountVerified;
    if (!verified) {
      this.router.navigate([RouterClient.LOGIN]);
      return false;
    }
    return true;
  }
}
