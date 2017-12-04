import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AddUserComponent} from '../add-user.component';
import {ValidatorMessageComponent} from '../validator-message';
import {CustomSelectComponent} from '../custom-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', component: AddUserComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AddUserComponent,
    CustomSelectComponent,
    ValidatorMessageComponent
  ],
  exports: [
    AddUserComponent
  ]
})
export class AddUserModule { }
