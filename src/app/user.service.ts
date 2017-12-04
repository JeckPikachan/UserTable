import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {USERS} from './current-users';
import {IUser, User} from './user';

@Injectable()
export class UserService {

  constructor() { }

  getUsers(): Observable<IUser[]> {
    return of(USERS);
  }

  getUser(login: string): Observable<IUser> {
    return of(USERS.find(user => user.login === login));
  }

  addUser(user: User): void {
    USERS.push(user);
  }
}
