import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {USERS} from './current-users';
import {IUser, User} from './user';
import {CONSTS} from "./CONSTS";
import {NoMemoryError} from "./no-memory-error-handler";

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
    this.getUsers().subscribe( users => {
      if (users.filter(user => user.getRole() === CONSTS.ROLE_USER).length > 1) {
        throw new NoMemoryError("Can't add user. No memory on cloud.");
      }

      USERS.push(user);
    });
  }
}
