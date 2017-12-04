import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, appRoutingProviders} from './app-routing.module';
import {UserService} from './user.service';
import {CustomValidatorsService} from './custom-validators.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
  ],
  exports:[
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService, CustomValidatorsService, appRoutingProviders, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
