import {IUser, User} from './user';
import {Admin} from './admin';

export let USERS: IUser[] = [
  new User('Jamie', 'jamie100', 'highly_secured_pass999', 1980,
    {country: 'Jamaica', city: 'Kingston'},
    [
    {
      type: 'e-mail',
      name: 'E-mail',
      value: 'jamie100@postmail.com'
    }
  ] ),
  new Admin("Ivan", "Pass123"),
  new Admin("Vasiliy", "PassVass")
];
