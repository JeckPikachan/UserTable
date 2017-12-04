import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserPageComponent} from '../user-page.component';

const routes: Routes = [
  { path: '', component: UserPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [UserPageComponent],
  declarations: [UserPageComponent]
})
export class UserPageModule { }
