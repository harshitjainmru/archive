import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddJobComponent } from "./add-job.component";
import { RouterModule, Routes } from "@angular/router";
import { JobStepFirstComponent } from "./job-step-first/job-step-first.component";
import { JobStepSecondComponent } from "./job-step-second/job-step-second.component";
import { JobStepThirdComponent } from "./job-step-third/job-step-third.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { JobService } from "./service/job.service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TrimValuesModule } from "src/app/directives/trim/trim-values.module";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { SearchFilterModule } from "src/app/pipes/search-filter/search-filter.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
} from "@angular/material/core";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { WorkerService } from "../../worker/service/worker.service";
import { NumberOnlyModule } from "src/app/directives/number-only/number-only.module";
import { JobPreviewComponent } from "./job-preview/job-preview.component";
import { ConstantParserModule } from "src/app/pipes/constant-parser/constant-parser.module";
import {
  DateFnsDateAdapter,
  MAT_DATE_FNS_DATE_FORMATS,
} from "src/app/services/date-fns-date-adapter.service";
import { MatDialogModule } from "@angular/material/dialog";
import { JobRequestRecievedPopupModule } from "../popups/job-request-recieved-popup/job-request-recieved-popup.module";
import { SearchJobRoleModule } from "src/app/modules/common/modules/search-job-role/search-job-role.module";
import { SearchSkillsModule } from "src/app/modules/common/modules/search-skills/search-skills.module";
import { SelectAddressModule } from "src/app/modules/common/modules/select-address/select-address.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { CheckNullPipeModule } from "src/app/pipes/check-null/check-null-pipe.module";
import { SuccessPopupModule } from "src/app/modules/common/modules/success-popup/success-popup.module";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { CustomCurrencyPipeModule } from "src/app/pipes/custom-currency-pipe/custom-currency-pipe.module";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { RoleSalaryPipeModule } from "src/app/pipes/role-salary-pipe/role-salary-pipe.module";
import { NullifyZeroModule } from 'src/app/directives/nullify-zero/nullify-zero.module';
import { CurrencyImageModule } from 'src/app/pipes/currency-image/currency-image.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuillEditorModule } from "src/app/modules/common/modules/quill/quill.module";
import { FloatDigitOnlyModule } from "src/app/directives/float-digit-only/float-digit-only.module";

const routes: Routes = [{ path: "", component: AddJobComponent }];

const DIRECTIVES = [NullifyZeroModule,FloatDigitOnlyModule]

const PIPES = [CurrencyImageModule]
@NgModule({
  declarations: [
    AddJobComponent,
    JobStepFirstComponent,
    JobStepSecondComponent,
    JobStepThirdComponent,
    JobPreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CheckNullPipeModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    TrimValuesModule,
    MatAutocompleteModule,
    SearchFilterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GetControlModule,
    NumberOnlyModule,
    ConstantParserModule,
    MatDialogModule,
    JobRequestRecievedPopupModule,
    ValidationErrorPipeModule,
    SearchJobRoleModule,
    SearchSkillsModule,
    SelectAddressModule,
    MatExpansionModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SuccessPopupModule,
    CustomCurrencyPipeModule,
    CustomDatePipeModule,
    RoleSalaryPipeModule,
    MatTooltipModule,
    QuillEditorModule,
    FloatDigitOnlyModule,
    ...DIRECTIVES,
    ...PIPES
  ],
  providers: [
    JobService,
    WorkerService,
    {
      provide: DateAdapter,
      useClass: DateFnsDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DATE_FNS_DATE_FORMATS,
    },
  ],
})
export class AddJobModule {}
