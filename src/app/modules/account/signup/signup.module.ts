import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SignupComponent } from "./view/signup.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { CheckMaxLengthModule } from "src/app/directives/check-max-length/check-max-length.module";
import { TrimDirectiveModule } from "src/app/directives/trim-directive/trim-directive.module";
import { TrimValuesModule } from "src/app/directives/trim/trim-values.module";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { TranslateModule } from "src/app/pipes/translate/translate.module";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { ButtonLoaderModule } from "../../common/modules/button-loader/button-loader.module";
import { OtpVerificationModule } from "../../common/modules/otp-verification/otp-verification.module";
import { PhoneFieldModule } from "../../common/modules/phone-field/phone-field.module";
import { NgxCaptchaModule } from "ngx-captcha";
import { PreventStartingSpaceModule } from "src/app/directives/prevent-starting-space/prevent-starting-space.module";

const routes: Routes = [{ path: "", component: SignupComponent }];

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule,
    GetControlModule,
    TranslateModule,
    PhoneFieldModule,
    OtpVerificationModule,
    AbsoluteRoutingModule,
    ButtonLoaderModule,
    CheckMaxLengthModule,
    MatIconModule,
    TrimValuesModule,
    MatCheckboxModule,
    MatButtonModule,
    TrimDirectiveModule,
    NgxCaptchaModule,
    PreventStartingSpaceModule,
  ],
})
export class SignupModule {}
