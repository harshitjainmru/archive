import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditCompanyAddressComponent } from "./edit-company-address.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NumberOnlyModule } from "src/app/directives/number-only/number-only.module";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { SelectJobareaModule } from "src/app/modules/common/modules/select-jobarea/select-jobarea.module";
import { UserProfileService } from "src/app/services/user-profile.service";
import { CompanyDetailsSuccessPopupModule } from "../../success-popup/success-popup.module";
import { PreventStartingSpaceModule } from "src/app/directives/prevent-starting-space/prevent-starting-space.module";
@NgModule({
  declarations: [EditCompanyAddressComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    NumberOnlyModule,
    GetControlModule,
    ValidationErrorPipeModule,
    SelectJobareaModule,
    CompanyDetailsSuccessPopupModule,
    PreventStartingSpaceModule,
    PreventStartingSpaceModule,
  ],
  providers: [ProfileSetupService],
  exports: [EditCompanyAddressComponent],
})
export class EditCompanyAddressModule {}
