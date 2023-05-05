import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditCompanyProfileComponent } from "./edit-company-profile.component";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { SearchFilterModule } from "src/app/pipes/search-filter/search-filter.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { SuccessPopupModule } from "src/app/modules/common/modules/success-popup/success-popup.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UserProfileService } from "src/app/services/user-profile.service";
import { CompanyDetailsSuccessPopupModule } from "../../success-popup/success-popup.module";
import { PreventStartingSpaceModule } from "src/app/directives/prevent-starting-space/prevent-starting-space.module";

@NgModule({
  declarations: [EditCompanyProfileComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    SearchFilterModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    GetControlModule,
    ValidationErrorPipeModule,
    CompanyDetailsSuccessPopupModule,
    MatTooltipModule,
    PreventStartingSpaceModule,
  ],
  exports: [EditCompanyProfileComponent],
  providers: [ProfileSetupService],
})
export class EditCompanyProfileModule {}
