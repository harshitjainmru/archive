import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeGraphViewComponent } from "./home-graph-view.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { HomeService } from "src/app/modules/features/home/home.service";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  NativeDateModule,
} from "@angular/material/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MomentDateModule } from "@angular/material-moment-adapter";
export const DATE_FORMATS = {
  parse: {
    dateInput: "DD-MM-YYYY",
  },
  display: {
    dateInput: "DD MMM YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@NgModule({
  declarations: [HomeGraphViewComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    CustomDatePipeModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,

    ReactiveFormsModule,
    MomentDateModule,
  ],
  providers: [
    HomeService,
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
  exports: [HomeGraphViewComponent],
})
export class HomeGraphViewModule {}
