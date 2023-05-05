import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { VALIDATION_CRITERIA } from 'src/app/constants/validation-criteria';

@Directive({
  selector: '[appNullifyZero]'
})
export class NullifyZeroDirective {


  constructor(
    private _elementRef:ElementRef
  ) { }


  @HostListener('keypress', ['$event']) onInput(e) {
      if(!isNaN(e.key) && Number(e.key) === 0){
        if(Number(this._elementRef.nativeElement.value)===0){
          e.preventDefault();
          return false;   
        }
      }
      return true;
    }
    
}
