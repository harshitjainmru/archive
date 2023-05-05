import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditUserProfileComponent } from "./edit-user-profile.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { SearchFilterModule } from "src/app/pipes/search-filter/search-filter.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { FileUploadService } from "src/app/services/file-upload.service";
import { PhoneFieldModule } from "src/app/modules/common/modules/phone-field/phone-field.module";
import { OtpVerificationModule } from "src/app/modules/common/modules/otp-verification/otp-verification.module";
import { DataLoaderModule } from "src/app/modules/common/modules/data-loader/data-loader.module";
import { SuccessPopupModule } from "src/app/modules/common/modules/success-popup/success-popup.module";
import { EditUserProfileSuccessComponent } from "./edit-user-profile-success/edit-user-profile-success.component";
import { PreventStartingSpaceModule } from "src/app/directives/prevent-starting-space/prevent-starting-space.module";

@NgModule({
  declarations: [EditUserProfileComponent, EditUserProfileSuccessComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    GetControlModule,
    ValidationErrorPipeModule,
    SearchFilterModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    PhoneFieldModule,
    OtpVerificationModule,
    DataLoaderModule,
    SuccessPopupModule,
    PreventStartingSpaceModule,
  ],
  exports: [EditUserProfileComponent],
  providers: [ProfileSetupService, FileUploadService],
})
export class EditUserProfileModule {}
