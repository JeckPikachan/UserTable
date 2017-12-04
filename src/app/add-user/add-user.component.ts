import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {
  AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn,
  Validators
} from '@angular/forms';
import {ContactType, User} from '../user';
import {CustomValidatorsService} from '../custom-validators.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public addUserForm: FormGroup = null;
  public userData: any = null;

  public contactTypes: ContactType[] = [
    {type: 'phone', name: 'Phone', validators: [this.validators.phoneValidator(), Validators.required]},
    {type: 'e-mail', name: 'E-mail', validators: [Validators.email,Validators.required]},
    {type: 'skype', name: 'Skype', validators: [Validators.required, this.validators.skypeLoginValidator()]}
  ];

  private getContactValidatorsByType(type: string): ValidatorFn[] {
    return this.contactTypes.filter((el: any) => el.type === type)[0].validators;
  }

  private getContactsNameByType(type: string): string {
    return this.contactTypes.filter((el: any) => el.type === type)[0].name;
  }

  constructor(private userService: UserService, private validators: CustomValidatorsService, private fb: FormBuilder) {
    const pwdValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6), Validators.maxLength(20)];
    const loginValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.validators.loginValidator()];

    this.addUserForm = fb.group({
      userName: ['', [Validators.required, this.validators.userNameValidator()]],
      login: ['', loginValidators],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      address: fb.group({
        country: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.required]],
        city: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.required]]
      }),
      contacts: fb.array([], this.validators.contactsLenValidator()),
      passwords: fb.group({
        pwd: ['', pwdValidators],
        confirm: ['', pwdValidators]
      }, {validator: this.validators.passwordsAreEqual()})
    });
  }

  public get contacts(): FormArray {
    return <FormArray>this.addUserForm.get('contacts');
  }

  // methods for contact manipulation
  public addContact(): void {
    const newItemType = this.contactTypes[0].type;
    const newItemName = this.contactTypes[0].name;
    (<FormArray>this.addUserForm.get('contacts')).push(
      this.fb.group({
        type: [newItemType, Validators.required],
        name: [newItemName],
        value: ['', this.getContactValidatorsByType(newItemType)]
      })
    );

    const contactControls = this.addUserForm.get('contacts')['controls'];
    const currentContactGroup = contactControls[contactControls.length - 1];

    currentContactGroup.get('type').valueChanges.subscribe((type: string) => {
      console.log(type);
      const valueCtrl: FormControl = currentContactGroup.get('value');
      valueCtrl.setValidators(this.getContactValidatorsByType(type));
      valueCtrl.updateValueAndValidity();
      const nameCtrl: FormControl = currentContactGroup.get('name');
      nameCtrl.setValue(this.getContactsNameByType(type));
    });
  }

  public removeContact(i: number): void {
    (<FormArray>this.addUserForm.get('contacts')).removeAt(i);
  }

  ngOnInit() {
    this.addContact();
    // clear user data, if form invalid
    this.addUserForm.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && !!this.userData) {
        this.userData = null;
      }
    });
  }

  private markControlsAsTouched(form) {
    for (let control in form.controls) {
      form.controls[control].markAsTouched();
      if (form.controls[control].controls) {
        this.markControlsAsTouched(form.controls[control]);
      }
    }
  }

  // submit form method
  public submitForm(e: Event) {
    e.preventDefault();

    if (this.addUserForm.invalid) {
      this.markControlsAsTouched(this.addUserForm);
      return false;
    }

    this.userData = this.addUserForm.value;
    let user = this.userData;
    let newUser = new User(user.userName, user.login, user.passwords.pwd, user.dateOfBirth, user.address, user.contacts);
    console.dir(user.contacts);
    this.userService.addUser(newUser);
  }

}
