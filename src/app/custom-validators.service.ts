import { Injectable } from '@angular/core';
import {AbstractControl, FormArray, FormGroup, ValidatorFn} from '@angular/forms';
import {USERS} from './current-users';

@Injectable()
export class CustomValidatorsService {

  constructor() { }

  public contactsLenValidator(): ValidatorFn {
    return (contacts: FormArray): { [key: string]: any } => {
      if (contacts.length !== 0) {
        return null;
      }
      return {
        custom: 'At least one contact info should be added'
      };
    };
  }

  public passwordsAreEqual(): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      if (!(group.dirty || group.touched) || group.get('pwd').value === group.get('confirm').value) {
        return null;
      }
      return {
        custom: 'Passwords are not equal'
      };
    };
  }

  public skypeLoginValidator(): ValidatorFn {
    const pattern: RegExp = /^[a-z][a-z0-9\.,\-_]{5,31}$/i;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: `Invalid skype login`};
      }
    };
  }

  public phoneValidator(): ValidatorFn {
    const pattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: `Invalid phone number`};
      }
    };
  }

  public userNameValidator(): ValidatorFn {
    const pattern: RegExp = /^[\w\.\$@\*\!]{5,30}$/;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: `Min length:5, can't contain whitespaces & special symbols.`};
      }
    };
  }

  public loginValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return USERS.findIndex(user => user.login == control.value) == -1 ? null : {custom: `This login already exists.`};
      }
    };
  }
}
