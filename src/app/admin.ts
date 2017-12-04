import {IUser} from './user';
import {CONSTS} from './CONSTS';

export class Admin implements IUser{
  login: string;
  password: string;

  getRole(): string {
    return CONSTS.ROLE_ADMIN;
  }

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
