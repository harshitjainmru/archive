import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatDigitOnlyDirective } from './float-digit-only.directive';



@NgModule({
  declarations: [FloatDigitOnlyDirective],
  imports: [
    CommonModule
  ],
  exports:[FloatDigitOnlyDirective]
})
export class FloatDigitOnlyModule { }
