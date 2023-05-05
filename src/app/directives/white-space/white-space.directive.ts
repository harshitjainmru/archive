import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({ 
  selector: '[appWhiteSpace]'
})
export class WhiteSpaceDirective {

  constructor(private _el: ElementRef,) {}
  @HostListener('keydown', ['$event']) keydown(e) {
    if (e.which === 32 && e.target.selectionStart === 0 || e.which === 192 && e.target.selectionStart === 0) {
      return false;
    }
  }

}