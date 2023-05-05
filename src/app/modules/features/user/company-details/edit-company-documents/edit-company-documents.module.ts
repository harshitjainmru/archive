import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditCompanyDocumentsComponent } from "./edit-company-documents.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { SelectJobareaModule } from "src/app/modules/common/modules/select-jobarea/select-jobarea.module";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { UserProfileService } from "src/app/services/user-profile.service";
import { CompanyDetailsSuccessPopupModule } from "../../success-popup/success-popup.module";

@NgModule({
  declarations: [EditCompanyDocumentsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    SelectJobareaModule,
    GetControlModule,
    CompanyDetailsSuccessPopupModule,
  ],
  providers: [ProfileSetupService],
  exports: [EditCompanyDocumentsComponent],
})
export class EditCompanyDocumentsModule {}
