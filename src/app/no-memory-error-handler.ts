import {ErrorHandler, Injectable} from "@angular/core";
import {ErrorService} from "./error.service";
import {Router} from "@angular/router";
import {CONSTS} from "./CONSTS";

export class NoMemoryError extends Error {


  constructor(message) {
    super(message);
    this.message = message;
    this.name = "NoMemoryError";
    Object.setPrototypeOf(this, NoMemoryError.prototype);
  }
}

@Injectable()
export class NoMemoryErrorHandler implements ErrorHandler {

  constructor(private errorService: ErrorService, private router: Router) {}

  handleError(e) : void {
    if (e instanceof NoMemoryError) {
      this.errorService.setError(e);
      this.router.navigate([CONSTS.ERROR_PAGE_LINK])
    }

    throw e;
  }

}
