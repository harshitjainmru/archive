import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDiffPipe } from './date-diff.pipe';



@NgModule({
  declarations: [DateDiffPipe],
  imports: [
    CommonModule
  ],
  exports:[DateDiffPipe]
})
export class DateDiffModule { }
