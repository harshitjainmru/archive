import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScheduleShiftPopupComponent } from "./schedule-shift-popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { DateAgoModule } from "src/app/pipes/date-ago/date-ago.module";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ScheduleShiftPopupComponent],
  imports: [CommonModule,  MatDialogModule,
    DateAgoModule,
    CustomDatePipeModule,
    AbsoluteRoutingModule,
    RouterModule
  ],
  exports: [ScheduleShiftPopupComponent],
  entryComponents: [ScheduleShiftPopupComponent],
})
export class ScheduleShiftPopupModule {}
