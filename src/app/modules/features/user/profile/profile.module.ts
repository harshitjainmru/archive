import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { RouterModule, Routes } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { EditUserProfileModule } from "../edit-user-profile/edit-user-profile.module";
import { EditCompanyProfileModule } from "../company-details/edit-company-profile/edit-company-profile.module";
import { MatDialogModule } from "@angular/material/dialog";
import { CheckNullPipeModule } from "src/app/pipes/check-null/check-null-pipe.module";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { AccountService } from "src/app/modules/account/account.service";
import { EditCompanyAddressModule } from "../company-details/edit-company-address/edit-company-address.module";
import { EditCompanyDocumentsModule } from "../company-details/edit-company-documents/edit-company-documents.module";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { CompanyDetailsSuccessPopupModule } from "../success-popup/success-popup.module";
import { QrCodeModule } from "../qr-code/qr-code.module";
import { RequestListModule } from "../request-module/request-list/request-list.module";
import { GalleryModule } from "ng-gallery";
import { LightboxModule } from "ng-gallery/lightbox";
const routes: Routes = [{ path: "", component: ProfileComponent }];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    EditUserProfileModule,
    EditCompanyProfileModule,
    MatDialogModule,
    CheckNullPipeModule,
    AbsoluteRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    EditCompanyAddressModule,
    EditCompanyDocumentsModule,
    CompanyDetailsSuccessPopupModule,
    QrCodeModule,
    RequestListModule,
    GalleryModule,
    LightboxModule,
  ],
  providers: [AccountService, ProfileSetupService],
})
export class ProfileModule {}
