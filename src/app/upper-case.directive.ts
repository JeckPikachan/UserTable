import {Directive, ElementRef, HostListener, OnChanges} from '@angular/core';

@Directive({
  selector: '[UpperCase]'
})
export class UpperCaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event']) onKeyUp(e) {
    let startPos = this.el.nativeElement.selectionStart;
    let endPos = this.el.nativeElement.selectionEnd;

    let currVal = this.el.nativeElement.value;
    this.el.nativeElement.value = currVal.toUpperCase();

    this.el.nativeElement.setSelectionRange(startPos, endPos);

  }

  // @HostListener('keypress', ['$event']) onKeyPress(e) {
  //   let char = e.keyCode;
  //   if (char >= 'a'.charCodeAt(0) && char <= 'z'.charCodeAt(0)) {
  //
  //   }
  // }

  @HostListener('blur', ['$event']) onBlur(e) {
      this.onKeyUp(e);
  }

}
