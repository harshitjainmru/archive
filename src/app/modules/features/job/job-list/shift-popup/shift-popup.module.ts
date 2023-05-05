import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftPopupComponent } from './shift-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { CustomCurrencyPipeModule } from 'src/app/pipes/custom-currency-pipe/custom-currency-pipe.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ShiftPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    CustomDatePipeModule,
    CheckNullPipeModule,
    CustomCurrencyPipeModule,
    MatButtonModule
  ],
  entryComponents: [ShiftPopupComponent],
  exports: [
    MatDialogModule,
    CustomDatePipeModule,
    CheckNullPipeModule,
    CustomCurrencyPipeModule
  ]
})
export class ShiftPopupModule { }
