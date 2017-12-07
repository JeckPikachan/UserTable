import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";

import {IShouldSave} from "../IShoudSave";
import {ErrorService} from "./error.service";

@Injectable()
export class SaveService implements CanDeactivate<IShouldSave> {

  constructor(private errorService: ErrorService) { }

  canDeactivate(component: IShouldSave, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot){
    if (component.Form.dirty && this.errorService.getError() == null) {
      return window.confirm("You have unsaved changes. Still want to leave?");
    }
    return true;
  }

}
