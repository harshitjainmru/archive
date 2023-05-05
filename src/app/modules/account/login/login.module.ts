import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './view/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TrimDirectiveModule } from 'src/app/directives/trim-directive/trim-directive.module';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';
import { TranslateModule } from 'src/app/pipes/translate/translate.module';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { ButtonLoaderModule } from '../../common/modules/button-loader/button-loader.module';
import { DataLoaderModule } from '../../common/modules/data-loader/data-loader.module';
import { OtpVerificationModule } from '../../common/modules/otp-verification/otp-verification.module';
import { PhoneFieldModule } from '../../common/modules/phone-field/phone-field.module';
import { TrimValuesModule } from 'src/app/directives/trim/trim-values.module';
import { MatIconModule } from "@angular/material/icon";
import { CheckMaxLengthModule } from 'src/app/directives/check-max-length/check-max-length.module';
import { BackendErrorModule } from 'src/app/pipes/backend-error/backend-error.module';
import { LoginService } from './service/login.service';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent, PhoneLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    BackendErrorModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
