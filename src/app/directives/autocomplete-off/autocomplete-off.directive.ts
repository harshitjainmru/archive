import { Directive, ElementRef, OnInit, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appAutocompleteOff]'
})
export class AutocompleteOffDirective implements OnInit,AfterViewChecked {

  private _chrome = navigator.userAgent.indexOf('Chrome') > -1;
  constructor(private _el: ElementRef) {}
  ngOnInit() {
    if (this._chrome) {
      if (this._el.nativeElement.getAttribute('autocomplete') === 'off') {
        setTimeout(() => {
          this._el.nativeElement.setAttribute('autocomplete', 'disabled');
        });
      }
    }
  }

  ngAfterViewChecked(){
    if (this._chrome) {
      if (this._el.nativeElement.getAttribute('autocomplete') === 'off') {
        setTimeout(() => {
          this._el.nativeElement.setAttribute('autocomplete', 'disabled');
        });
      }
    }
  }

}
