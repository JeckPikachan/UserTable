import {ValidatorFn} from '@angular/forms';
import {CONSTS} from './CONSTS';
import {Utils} from "./utils";

export interface IUser {
  login: string;
  password: string;
  getRole();
}

export class User implements IUser{
  name: string;
  login: string;
  password: string;
  dateOfBirth: number;
  address: Address;
  contacts: Contact[];

  getRole() {
    return CONSTS.ROLE_USER;
  }

  constructor(name: string, login: string, password: string, dateOfBirth: number, address: Address, contacts: Contact[]) {
    this.name = name;
    this.login = login;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.address = Utils.clone(address);
    this.contacts = Utils.clone(contacts);
  }


}

export class Address {
  country: string;
  city: string;
}

export class ContactType {
  type: string;
  name: string;
  validators?: ValidatorFn[];
}

export class Contact extends ContactType {
  value: string;
}



