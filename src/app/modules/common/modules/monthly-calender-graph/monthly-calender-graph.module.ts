import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonthlyCalenderGraphComponent } from "./monthly-calender-graph.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule, MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MomentDateModule } from "@angular/material-moment-adapter";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
export const DATE_FORMATS = {
  parse: {
    dateInput: "DD-MM-YYYY",
  },
  display: {
    dateInput: "MMM YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
const MATERIAL_MODULES = [
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  ReactiveFormsModule,
  MatInputModule,
  CustomDatePipeModule,
  MomentDateModule,
];
@NgModule({
  declarations: [MonthlyCalenderGraphComponent],
  imports: [CommonModule, ...MATERIAL_MODULES],
  exports: [MonthlyCalenderGraphComponent],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }],
})
export class MonthlyCalenderGraphModule {}
