import { Injectable } from '@angular/core';
import {Admin} from './admin';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import {IUser} from './user';
import {USERS} from './current-users';
import {CONSTS} from './CONSTS';
import {Router} from '@angular/router';

let usersObservable: Observable<IUser[]> = of(USERS);

@Injectable()
export class AuthService {

  private isSignedIn: boolean;
  private signedInUser: IUser;
  private redirectUrl: string = '/';
  private signInUrl: string = '/signIn';

  getUsers(): Observable<IUser[]> {
    return usersObservable;
  }

  constructor(private router: Router) {

  }

  isUserAuthenticated(login: string, password: string): Observable<boolean> {
    return this.getUsers().map(users => {
      let user = users.find(user => (user.password === password && user.login === login));
      if (user) {
        localStorage.setItem('signedUser', JSON.stringify(user));
        this.signedInUser = user;
        switch (user.getRole()) {
          case CONSTS.ROLE_USER:
            this.redirectUrl = CONSTS.USER_REDIRECT_PAGE;
            break;
          case CONSTS.ROLE_ADMIN:
            this.redirectUrl = CONSTS.ADMIN_REDIRECT_PAGE;
            break;
        }
        this.isSignedIn = true;
      }
      else {
        this.isSignedIn = false;
      }

      return this.isSignedIn;
    })
  }

  isUserSignedIn(): Observable<boolean> {
    if (this.isSignedIn == null) {
      const isSigned = localStorage.getItem('signedUser');
      if (isSigned) {
        try {
          let data = JSON.parse(isSigned);
          if (!(data.login && data.password)) throw new Error("Invalid data.");
          return this.isUserAuthenticated(data.login, data.password);
        }
        catch (e) {
          console.log(e.message);
          this.isSignedIn = false;
          return of(false);
        }
      }
      else {
        this.isSignedIn = false;
        return of(false);
      }
    }
    else {
      return of(this.isSignedIn);
    }
  }
  getSignedUserRole(): string {
    let role = "";
    const user = this.signedInUser;
    if (this.signedInUser) {
      role = user.getRole();
    }
    return role;
  }
  getRedirectUrl(): string {
    return this.redirectUrl;
  }
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }
  getSignInUrl(): string {
    return this.signInUrl;
  }
  getSignedInUser(): Observable<IUser> {
    return of(this.signedInUser);
  }
  signOutUser(): void{
    this.isSignedIn = false;
    localStorage.removeItem('signedUser');
    const url: string = this.getSignInUrl();
    this.router.navigate([url]);
  }

}
