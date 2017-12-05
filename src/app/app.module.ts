import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, appRoutingProviders} from './app-routing.module';
import {UserService} from './user.service';
import {CustomValidatorsService} from './custom-validators.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import { Page404Component } from './page-404/page-404.component';
import {ErrorService} from "./error.service";



@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
  ],
  exports:[
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService, CustomValidatorsService, appRoutingProviders, HttpClient, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
