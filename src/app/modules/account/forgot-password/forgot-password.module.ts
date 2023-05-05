import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './view/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CheckMaxLengthModule } from 'src/app/directives/check-max-length/check-max-length.module';
import { TrimDirectiveModule } from 'src/app/directives/trim-directive/trim-directive.module';
import { TrimValuesModule } from 'src/app/directives/trim/trim-values.module';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';
import { TranslateModule } from 'src/app/pipes/translate/translate.module';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { ButtonLoaderModule } from '../../common/modules/button-loader/button-loader.module';
import { DataLoaderModule } from '../../common/modules/data-loader/data-loader.module';
import { OtpVerificationModule } from '../../common/modules/otp-verification/otp-verification.module';
import { PhoneFieldModule } from '../../common/modules/phone-field/phone-field.module';

const routes: Routes = [
  { path: '', component: ForgotPasswordComponent }
];


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    OtpVerificationModule,
    ReactiveFormsModule,
    GetControlModule,
    ValidationErrorPipeModule,
    TranslateModule,
    PhoneFieldModule,
    AbsoluteRoutingModule,
    ButtonLoaderModule,
    MatIconModule,
    CheckMaxLengthModule,
    TrimValuesModule,
    MatButtonModule,
    TrimDirectiveModule,
    DataLoaderModule,
  ]
})
export class ForgotPasswordModule { }
