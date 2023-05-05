import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobDetailsComponent } from "./job-details.component";
import { Routes, RouterModule } from "@angular/router";
import { MatRadioModule } from "@angular/material/radio";
import { JobListService } from "../job-list/job-list.service";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { MatMenuModule } from "@angular/material/menu";
import { ConstantParserModule } from "src/app/pipes/constant-parser/constant-parser.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { CustomCurrencyPipeModule } from "src/app/pipes/custom-currency-pipe/custom-currency-pipe.module";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { JobStatusChipModule } from "src/app/modules/common/modules/job-status-chip/job-status-chip.module";
const routes: Routes = [
  {
    path: "",
    component: JobDetailsComponent,
  },
];

@NgModule({
  declarations: [JobDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatRadioModule,
    AbsoluteRoutingModule,
    MatMenuModule,
    MatExpansionModule,
    ConstantParserModule,
    CustomCurrencyPipeModule,
    CustomDatePipeModule,
    JobStatusChipModule,
  ],
  providers: [JobListService],
})
export class JobDetailsModule {}
