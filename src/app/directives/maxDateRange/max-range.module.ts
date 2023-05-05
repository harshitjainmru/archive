import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaxRangeDirective } from './max-range.directive';



@NgModule({
  declarations: [MaxRangeDirective],
  imports: [
    CommonModule
  ],
  exports:[MaxRangeDirective]
})
export class MaxRangeModule { }
