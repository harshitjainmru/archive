import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ApplicantDetailsRoutingModule } from "./applicant-details-routing.module";
import { ApplicantDetailsComponent } from "./applicant-details.component";
import { ApplicantStatusPipeModule } from "src/app/pipes/applicant-status-pipe/applicant-status-pipe.module";
import { MatMenuModule } from "@angular/material/menu";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { UnderDevModule } from "src/app/directives/under-dev/under-dev.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BarRatingModule } from "ngx-bar-rating";
import {
  InfiniteScrollDirective,
  InfiniteScrollModule,
} from "ngx-infinite-scroll";
import { MatDialogModule } from "@angular/material/dialog";
import { CreateRequestModule } from "../../../user/request-module/create-request/create-request.module";
import { CreateContractPopupModule } from "../../search-applicant/create-contract-popup/create-contract-popup.module";

@NgModule({
  declarations: [ApplicantDetailsComponent],
  imports: [
    CommonModule,
    ApplicantDetailsRoutingModule,
    ApplicantStatusPipeModule,
    MatMenuModule,
    AbsoluteRoutingModule,
    UnderDevModule,
    MatTooltipModule,
    BarRatingModule,
    InfiniteScrollModule,
    MatDialogModule,
    CreateRequestModule,
    CreateContractPopupModule
  ],
})
export class ApplicantDetailsModule {
  constructor() {
    console.log("candidate deta");
  }
}
