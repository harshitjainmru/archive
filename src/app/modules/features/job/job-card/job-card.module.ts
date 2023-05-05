import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobCardComponent } from "./job-card.component";
import { JobListService } from "../job-list/job-list.service";
import { ConstantParserModule } from "src/app/pipes/constant-parser/constant-parser.module";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CheckNullPipeModule } from "src/app/pipes/check-null/check-null-pipe.module";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { CustomCurrencyPipeModule } from "src/app/pipes/custom-currency-pipe/custom-currency-pipe.module";
import { RouterModule } from "@angular/router";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { JobStatusChipModule } from "src/app/modules/common/modules/job-status-chip/job-status-chip.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { DateDiffModule } from "src/app/pipes/date-diff/date-diff.module";

const PIPES = [
  CheckNullPipeModule,
  CustomDatePipeModule,
  CustomCurrencyPipeModule,
  DateDiffModule
];
@NgModule({
  declarations: [JobCardComponent],
  imports: [
    CommonModule,
    ConstantParserModule,
    MatMenuModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    AbsoluteRoutingModule,
    ...PIPES,
    JobStatusChipModule,
    MatExpansionModule
  ],
  exports: [JobCardComponent],
  providers: [JobListService],
})
export class JobCardModule {}
