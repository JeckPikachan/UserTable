import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {CONSTS} from './CONSTS';

@Injectable()
export class AuthGuardService implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let url: string = state.url;
    return this.authService.isUserSignedIn().map(res => {
      if (res) {
        const role = this.authService.getSignedUserRole();
        if (role === CONSTS.ROLE_ADMIN && url.split('/')[1] === CONSTS.ADMIN_REDIRECT_PAGE)
          return true;
        if (role === CONSTS.ROLE_USER && url.split('/')[1] === CONSTS.USER_REDIRECT_PAGE)
          return true;
        this.router.navigate([ this.authService.getRedirectUrl() ]);
      }
      this.router.navigate([ this.authService.getSignInUrl() ]);
      return false;
    })
  }

}
