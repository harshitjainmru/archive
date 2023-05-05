import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { OtpBoxComponent } from "./otp-box.component";
import { KeysModule } from "src/app/pipes/keys/keys.module";
import { OtpDirectiveModule } from "src/app/directives/otp-directive/otp-directive.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "src/app/pipes/translate/translate.module";
import { ButtonLoaderModule } from "../../button-loader/button-loader.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [OtpBoxComponent],
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
  ],
  exports: [OtpBoxComponent],
})
export class OtpBoxModule {}
