import {ErrorHandler, Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AddUserComponent} from '../add-user.component';
import {ValidatorMessageComponent} from '../validator-message';
import {CustomSelectComponent} from '../custom-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SaveService} from "../../save.service";
import {NoMemoryErrorHandler} from "../../no-memory-error-handler";
import {SymbolRestrictionDirective} from "../../symbol-restriction.directive";
import {UpperCaseDirective} from "../../upper-case.directive";

const routes: Routes = [
  { path: '', component: AddUserComponent, canDeactivate: [SaveService] }
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
    UpperCaseDirective,
    CustomSelectComponent,
    SymbolRestrictionDirective,
    ValidatorMessageComponent
  ],
  exports: [
    AddUserComponent
  ],
  providers: [
    SaveService,
    {provide: ErrorHandler, useClass: NoMemoryErrorHandler}
  ]
})
export class AddUserModule { }
