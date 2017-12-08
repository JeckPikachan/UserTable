import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersComponent} from '../users.component';
import {RouterModule, Routes} from '@angular/router';
import {PdfViewerModule} from "ng2-pdf-viewer";

const routes: Routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    PdfViewerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UsersComponent
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
