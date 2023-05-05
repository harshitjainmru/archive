import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcTimeDiffPipe } from './calc-time-diff.pipe';



@NgModule({
  declarations: [CalcTimeDiffPipe],
  imports: [
    CommonModule
  ],
  exports:[CalcTimeDiffPipe]
})
export class CalcTimeDiffModule { }
