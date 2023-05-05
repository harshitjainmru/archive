import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddShiftComponent } from './add-shift.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShiftSuccessPopupModule } from '../shift-success-popup/shift-success-popup.module';
import { ShiftService } from '../service/shift.service';
import { DateTimePickerModule } from '../../../../modules/common/modules/date-time-picker/date-time-picker.module';
import { TrimDirectiveModule } from 'src/app/directives/trim-directive/trim-directive.module';
import { TranslateModule } from 'src/app/pipes/translate/translate.module';

const routes: Routes = [
  {
    path: "",
    component: AddShiftComponent
  }
];



@NgModule({
  declarations: [AddShiftComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShiftSuccessPopupModule,
    DateTimePickerModule,
    TrimDirectiveModule,
    MatCheckboxModule,
    TranslateModule,
  ],
  providers: [ShiftService]
})
export class AddShiftModule { }
