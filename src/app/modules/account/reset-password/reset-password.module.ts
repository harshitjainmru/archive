import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordComponent } from './view/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CheckMaxLengthModule } from 'src/app/directives/check-max-length/check-max-length.module';
import { TrimValuesModule } from 'src/app/directives/trim/trim-values.module';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';
import { TranslateModule } from 'src/app/pipes/translate/translate.module';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { ButtonLoaderModule } from '../../common/modules/button-loader/button-loader.module';
import { SuccessPopupModule } from '../../common/modules/success-popup/success-popup.module';

const routes: Routes = [
  { path: '', component: ResetPasswordComponent }
];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    GetControlModule,
    ValidationErrorPipeModule,
    TranslateModule,
    ButtonLoaderModule,
    MatIconModule,
    CheckMaxLengthModule,
    TrimValuesModule,
    SuccessPopupModule
  ]
})
export class ResetPasswordModule { }
