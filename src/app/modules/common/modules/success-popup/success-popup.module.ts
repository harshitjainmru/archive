import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessPopupComponent } from './success-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';



@NgModule({
  declarations: [SuccessPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    AbsoluteRoutingModule
  ],
  exports: [SuccessPopupComponent]
})
export class SuccessPopupModule { }
