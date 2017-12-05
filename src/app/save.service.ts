import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";

import {IShoudSave} from "../IShoudSave";
import {ErrorService} from "./error.service";

@Injectable()
export class SaveService implements CanDeactivate<IShoudSave> {

  constructor(private errorService: ErrorService) { }

  canDeactivate(component: IShoudSave, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot){
    if (component.Form.dirty && this.errorService.getError() == null) {
      return window.confirm("You have unsaved changes. Still want to leave?");
    }
    return true;
  }

}
