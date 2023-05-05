import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftSuccessPopupComponent } from './shift-success-popup.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ShiftSuccessPopupComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ShiftSuccessPopupComponent]
})
export class ShiftSuccessPopupModule { }
