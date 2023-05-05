import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullifyZeroDirective } from './nullify-zero.directive';



@NgModule({
  declarations: [NullifyZeroDirective],
  imports: [
    CommonModule
  ],
  exports:[NullifyZeroDirective]
})
export class NullifyZeroModule { }
