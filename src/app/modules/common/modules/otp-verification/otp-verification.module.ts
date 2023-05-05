import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OtpVerificationComponent } from "./otp-verification.component";
// import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { KeysModule } from "../../../../pipes/keys/keys.module";
import { OtpDirectiveModule } from "../../../../directives/otp-directive/otp-directive.module";
import { TranslateModule } from "../../../../pipes/translate/translate.module";
import { ButtonLoaderModule } from "../button-loader/button-loader.module";
import { MatButtonModule } from "@angular/material/button";
import { OtpBoxModule } from "./otp-box/otp-box.module";

@NgModule({
  declarations: [OtpVerificationComponent],
  imports: [
    CommonModule,
    // MatFormFieldModule,
    MatInputModule,
    KeysModule,
    OtpDirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonLoaderModule,
    MatButtonModule,
    OtpBoxModule,
  ],
  exports: [OtpVerificationComponent],
})
export class OtpVerificationModule {}
