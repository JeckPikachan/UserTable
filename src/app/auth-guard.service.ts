import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let url: string = state.url;
    let data = route.data;
    let pageRole = data[0];
    return this.authService.isUserSignedIn().map(res => {
      if (res) {
        const role = this.authService.getSignedUserRole();
        if (role === pageRole)
          return true;
        this.router.navigate([ this.authService.getRedirectUrl() ]);
      }
      this.router.navigate([ this.authService.getSignInUrl() ]);
      return false;
    })
  }

}
