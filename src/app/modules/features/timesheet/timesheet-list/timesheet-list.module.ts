import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { TimesheetListRoutingModule } from "./timesheet-list-routing.module";
import { TimesheetListComponent } from "./timesheet-list.component";
import { CandidatePopupComponent } from "./candidate-popup/candidate-popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TimesheetFilterComponent } from "./timesheet-filter/timesheet-filter.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatRadioModule } from "@angular/material/radio";
import { ApprovePopupComponent } from "./approve-popup/approve-popup.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { TimesheetDateRangeModule } from "../timesheet-date-range/timesheet-date-range.module";
import { TabsModule } from "src/app/modules/common/components/tabs/tabs.module";
import { TimesheetFilterModule } from "./timesheet-filter/timesheet-filter.module";
import { SearchModule } from "src/app/pipes/search/search.module";
import { CommonSearchModule } from "src/app/modules/common/modules/common-search/common-search.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NoRecordModule } from "src/app/modules/common/modules/no-record/no-record.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DisplayMonthModule } from "src/app/pipes/display-month/display-month.module";
import { CustomCheckboxModule } from "src/app/modules/common/modules/custom-checkbox/custom-checkbox.module";
import { CheckNullPipeModule } from "src/app/pipes/check-null/check-null-pipe.module";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { ImageFallbackModule } from "src/app/directives/image-fallback/image-fallback.module";
import { EditTimesheetComponent } from "./edit-timesheet/edit-timesheet.component";
import { OwlTimeModule } from "src/app/modules/common/modules/owl-time/owl-time.module";
import { TimesheetAttendanceComponent } from "./timesheet-attendance/timesheet-attendance.component";
import { CalcTimeDiffModule } from "src/app/pipes/calc-time-diff/calc-time-diff.module";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { StylePaginatorModule } from "src/app/directives/style-paginator/style-paginator.module";
import { CheckTimsheetEditModule } from "src/app/pipes/check-timsheet-edit/check-timsheet-edit.module";
import { EmptyStatePipeModule } from "src/app/pipes/empty-state-pipe/empty-state-pipe.module";

const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  StylePaginatorModule,
];

const CUSTOM_MODULES = [
  TimesheetDateRangeModule,
  TabsModule,
  TimesheetFilterModule,
  CommonSearchModule,
  NoRecordModule,
  CustomCheckboxModule,
  OwlTimeModule,
];
const PIPES = [
  DisplayMonthModule,
  CheckNullPipeModule,
  CustomDatePipeModule,
  ImageFallbackModule,
  CalcTimeDiffModule,
  GetControlModule,
  CheckTimsheetEditModule,
  EmptyStatePipeModule
];

@NgModule({
  declarations: [
    TimesheetListComponent,
    CandidatePopupComponent,
    ApprovePopupComponent,
    EditTimesheetComponent,
    TimesheetAttendanceComponent,
  ],
  imports: [
    CommonModule,
    TimesheetListRoutingModule,
    InfiniteScrollModule,
    ...MATERIAL,
    ...CUSTOM_MODULES,
    ...PIPES,
  ],
})
export class TimesheetListModule {}
