import {ValidatorFn} from '@angular/forms';
import {CONSTS} from './CONSTS';

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
    this.address = User.clone(address);
    this.contacts = User.clone(contacts);
  }

  static clone(obj): any {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        if (Array.isArray(obj[attr])) {
          let newArray = obj[attr].map(el => User.clone(el));
          copy[attr] = newArray;
        }
        else if (typeof obj[attr] == "object") {
          copy[attr] = User.clone(obj[attr]);
        }
        else copy[attr] = obj[attr];
      }
    }
    return copy;
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



