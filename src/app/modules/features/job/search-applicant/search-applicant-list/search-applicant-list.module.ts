import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchApplicantListComponent } from "./search-applicant-list.component";
import { RouterModule, Routes } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { TabsModule } from "src/app/modules/common/components/tabs/tabs.module";
import { ChipSearchFormModule } from "src/app/modules/common/modules/chip-search-form/chip-search-form.module";
import { CommonSearchModule } from "src/app/modules/common/modules/common-search/common-search.module";
import { NoRecordModule } from "src/app/modules/common/modules/no-record/no-record.module";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { SearchApplicantCardModule } from "../search-applicant-card/search-applicant-card.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JobStatusChipModule } from "src/app/modules/common/modules/job-status-chip/job-status-chip.module";
import { SearchApplicantFilterModule } from "../search-applicant-filter/search-applicant-filter.module";
import { ApplicantService } from "../../applicant/applicant.service";
import { InviteCandidatePopupModule } from "../invite-candidate-popup/invite-candidate-popup.module";
import { StylePaginatorModule } from "src/app/directives/style-paginator/style-paginator.module";
import { CreateContractPopupModule } from "../create-contract-popup/create-contract-popup.module";

const routes: Routes = [
  {
    path: "",
    component: SearchApplicantListComponent,
  },
];

const CUSTOM_MODULES = [
  TabsModule,
  NoRecordModule,
  CommonSearchModule,
  TabsModule,
  CreateContractPopupModule,
  ChipSearchFormModule,
  SearchApplicantFilterModule,
  InviteCandidatePopupModule,
];
const MATERIAL = [
  MatSelectModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatRadioModule,
  MatCheckboxModule,
  MatButtonModule,
  MatExpansionModule,
];
const PIPES = [AbsoluteRoutingModule];

@NgModule({
  declarations: [SearchApplicantListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchApplicantCardModule,
    ReactiveFormsModule,
    JobStatusChipModule,
    FormsModule,

    ...CUSTOM_MODULES,
    ...MATERIAL,
    ...PIPES,

    StylePaginatorModule,
  ],
})
export class SearchApplicantListModule {}
