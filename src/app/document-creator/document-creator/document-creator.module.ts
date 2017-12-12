import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentCreatorComponent} from "../document-creator.component";
import {RouterModule, Routes} from "@angular/router";
import {DndModule, DragDropService, DragDropConfig} from "ng2-dnd";

const routes: Routes = [
  { path: '', component: DocumentCreatorComponent }
];

@NgModule({
  imports: [
    CommonModule,
    DndModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    DocumentCreatorComponent,
  ],
  exports: [
    DocumentCreatorComponent
  ],
})
export class DocumentCreatorModule { }
