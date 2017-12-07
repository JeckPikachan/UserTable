import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[SymbolRestriction]'
})
export class SymbolRestrictionDirective implements OnInit{

  private _config;

  @Input('SymbolRestriction') set config(data: number) {
    this._config = data;
    this.setRestriction(this._config);
  }

  get config(): number {
    return this._config;
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.setRestriction(this.config);
  }

  setRestriction(amount: number): void {
    if (amount > 0)
      this.el.nativeElement.maxLength = amount;
    else
      this.el.nativeElement.removeAttribute('maxLength');
  }

}

