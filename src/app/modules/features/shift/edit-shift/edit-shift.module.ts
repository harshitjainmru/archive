import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditShiftComponent } from './edit-shift.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from 'src/app/pipes/translate/translate.module';
import { TrimDirectiveModule } from 'src/app/directives/trim-directive/trim-directive.module';
import { DateTimePickerModule } from 'src/app/modules/common/modules/date-time-picker/date-time-picker.module';
import { ShiftSuccessPopupModule } from '../shift-success-popup/shift-success-popup.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [EditShiftComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ShiftSuccessPopupModule,
    DateTimePickerModule,
    TrimDirectiveModule,
    TranslateModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [EditShiftComponent]
})
export class EditShiftModule { }
