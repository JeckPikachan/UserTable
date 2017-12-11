import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TemplatingComponent} from "../templating.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TemplatingComponent
  ],
  exports: [
    TemplatingComponent
  ]
})
export class TemplatingModule { }
