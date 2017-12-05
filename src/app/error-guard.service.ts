import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {ErrorService} from "./error.service";

@Injectable()
export class ErrorGuardService implements CanActivate{

  constructor(private errorService: ErrorService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let error = this.errorService.getError();
    return error != null;
  }
}
