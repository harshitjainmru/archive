import { Directive, HostListener, Input,HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {
  @HostBinding('attr.autocomplete') autocomplete = 'off';
  @Input() allowDecimal = false;
  constructor(private el: ElementRef) { 
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {

    if (
      [46, 8, 9, 27, 13, ...(this.allowDecimal ? [190] : [])].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
      (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
      (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
      (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) { 
    let number = Number(this.el.nativeElement.value);
    if (this.isFloat(number)) {
      this.el.nativeElement.value = +parseFloat(this.el.nativeElement.value).toFixed( 2 );
    }
  }

  isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

}
