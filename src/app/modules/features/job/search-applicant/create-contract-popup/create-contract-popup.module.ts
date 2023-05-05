import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ReactiveFormsModule } from "@angular/forms";
import {
  DateFnsDateAdapter,
  MAT_DATE_FNS_DATE_FORMATS,
} from "src/app/services/date-fns-date-adapter.service";
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { NumberOnlyModule } from "src/app/directives/number-only/number-only.module";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { CustomCurrencyPipeModule } from "src/app/pipes/custom-currency-pipe/custom-currency-pipe.module";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { MomentDateModule } from "@angular/material-moment-adapter";
import { CreateContractPopupComponent } from "./create-contract-popup.component";

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
  declarations: [CreateContractPopupComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NumberOnlyModule,
    ReactiveFormsModule,
    GetControlModule,
    ValidationErrorPipeModule,
    CustomCurrencyPipeModule,
    CustomDatePipeModule,
    MomentDateModule,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }],
  exports: [CreateContractPopupComponent],
})
export class CreateContractPopupModule {}
