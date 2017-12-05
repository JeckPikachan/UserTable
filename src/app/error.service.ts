import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  private currentError = null;

  constructor() { }

  getError(): Error | null {
    return this.currentError;
  }

  setError(e) {
    this.currentError = e;
  }

  unsetError() {
    this.currentError = null;
  }

}
