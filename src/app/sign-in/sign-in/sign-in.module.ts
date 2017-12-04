import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from '../sign-in.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', component: SignInComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [SignInComponent],
  declarations: [SignInComponent],
})
export class SignInModule { }
