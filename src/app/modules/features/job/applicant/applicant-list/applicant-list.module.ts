import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { ApplicantListRoutingModule } from "./applicant-list-routing.module";
import { ApplicantListComponent } from "./applicant-list.component";
import { ApplicantCardModule } from "./applicant-card/applicant-card.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApplicantFilterComponent } from "./applicant-filter/applicant-filter.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CreateContractPopupModule } from "./create-contract-popup/create-contract-popup.module";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TabsModule } from "src/app/modules/common/components/tabs/tabs.module";
import { CommonSearchModule } from "src/app/modules/common/modules/common-search/common-search.module";
import { NoRecordModule } from "src/app/modules/common/modules/no-record/no-record.module";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { ApplicantService } from "../applicant.service";
import { SearchSkillsModule } from "src/app/modules/common/modules/search-skills/search-skills.module";
import { JobService } from "../../add-job/service/job.service";
import { ChipSearchFormModule } from "src/app/modules/common/modules/chip-search-form/chip-search-form.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { JobStatusChipModule } from "src/app/modules/common/modules/job-status-chip/job-status-chip.module";
import { JobListService } from "../../job-list/job-list.service";
import { SearchApplicantCardModule } from "../../search-applicant/search-applicant-card/search-applicant-card.module";
import { StylePaginatorModule } from "src/app/directives/style-paginator/style-paginator.module";
import { EmptyStatePipeModule } from "src/app/pipes/empty-state-pipe/empty-state-pipe.module";

const CUSTOM_MODULES = [
  TabsModule,
  NoRecordModule,
  CommonSearchModule,
  TabsModule,
  CreateContractPopupModule,
  ChipSearchFormModule,
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
const PIPES = [AbsoluteRoutingModule,EmptyStatePipeModule];

@NgModule({
  declarations: [ApplicantListComponent, ApplicantFilterComponent],
  imports: [
    CommonModule,
    ApplicantListRoutingModule,
    ApplicantCardModule,
    ReactiveFormsModule,
    JobStatusChipModule,
    FormsModule,
    SearchApplicantCardModule,
    ...CUSTOM_MODULES,
    ...MATERIAL,
    ...PIPES,
    StylePaginatorModule,
  ],
  providers: [JobListService],
})
export class ApplicantListModule {}
