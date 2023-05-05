import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayOperatorPipe } from './array-operator.pipe';



@NgModule({
  declarations: [ArrayOperatorPipe],
  imports: [
    CommonModule
  ],
  exports:[ArrayOperatorPipe]
})
export class ArrayOperatorModule { }
