import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorService} from "../error.service";
import { Location } from '@angular/common';


@Component({
  selector: 'app-page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.css']
})
export class Page404Component implements OnInit, OnDestroy {

  private error: Error;

  constructor(private errorService: ErrorService, private location: Location) { }

  ngOnInit() {
    this.error = this.errorService.getError();
  }

  goBack() {
    this.location.back();
  }

  goBackTwice() {
    window.history.go(-2);
  }

  ngOnDestroy() {
    this.errorService.unsetError();
  }

}
