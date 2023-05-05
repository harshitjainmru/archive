import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScheduleShiftComponent } from "./schedule-shift.component";
import { RouterModule, Routes } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { CommonSearchModule } from "src/app/modules/common/modules/common-search/common-search.module";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { ScheduleShiftFilterModule } from "./schedule-shift-filter/schedule-shift-filter.module";
import { WeeklyCalendarSelectorModule } from "src/app/modules/common/modules/weekly-calendar-selector/weekly-calendar-selector.module";
import { ScheduleService } from "../schedule.service";
import { DisplayMonthModule } from "src/app/pipes/display-month/display-month.module";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { ReactiveFormsModule } from "@angular/forms";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { CheckNullPipeModule } from "src/app/pipes/check-null/check-null-pipe.module";
import { NoRecordModule } from "src/app/modules/common/modules/no-record/no-record.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { WarningPopupComponent } from "./warning-popup/warning-popup.component";
import { HoverModule } from "src/app/directives/hover/hover.module";
import { SelectScheduleDropdownModule } from "src/app/modules/common/modules/select-dropdown/select-schedule-dropdown.module";
import { ImageFallbackModule } from "src/app/directives/image-fallback/image-fallback.module";
import { ScheduleInfoPopupComponent } from "./schedule-info-popup/schedule-info-popup.component";
import { MatTooltipModule } from "@angular/material/tooltip";

const routes: Routes = [
  {
    path: "",
    component: ScheduleShiftComponent,
  },
];

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatTableModule,
  MatMenuModule,
  MatDialogModule,
  WeeklyCalendarSelectorModule,
  ReactiveFormsModule,
  MatPaginatorModule,
  MatTooltipModule,
];

const CUSTOM_MODULES = [
  SelectScheduleDropdownModule,
  ScheduleShiftFilterModule,
  NoRecordModule,
];

const PIPES = [
  DisplayMonthModule,
  CustomDatePipeModule,
  GetControlModule,
  CheckNullPipeModule,
];

const DIRECTIVES = [ImageFallbackModule];

@NgModule({
  declarations: [
    ScheduleShiftComponent,
    WarningPopupComponent,
    ScheduleInfoPopupComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    CommonSearchModule,
    MatDatepickerModule,
    MatInputModule,
    RouterModule.forChild(routes),
    ...MATERIAL_MODULES,
    ...CUSTOM_MODULES,
    ...PIPES,
    ...DIRECTIVES,
  ],
  providers: [ScheduleService],
})
export class ScheduleShiftModule {}
