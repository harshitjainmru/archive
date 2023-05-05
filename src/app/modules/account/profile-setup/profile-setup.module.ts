import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileSetupRoutingModule } from "./profile-setup-routing.module";
import { ProfileSetupComponent } from "./profile-setup.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { SuccessPopupModule } from "../../common/modules/success-popup/success-popup.module";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { ProfileSetupService } from "./profile-setup.service";
import { BackendErrorModule } from "src/app/pipes/backend-error/backend-error.module";
import { TrimDirectiveModule } from "src/app/directives/trim-directive/trim-directive.module";
import { TrimValuesModule } from "src/app/directives/trim/trim-values.module";
import { SearchFilterModule } from "src/app/pipes/search-filter/search-filter.module";
import { StepsOneComponent } from "./steps-one/steps-one.component";
import { StepsTwoComponent } from "./steps-two/steps-two.component";
import { StepsThreeComponent } from "./steps-three/steps-three.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { GoogleMapModule } from "../../common/modules/google-map";
import { NumberOnlyModule } from "src/app/directives/number-only/number-only.module";
import { SelectJobareaModule } from "../../common/modules/select-jobarea/select-jobarea.module";
import { ChipSearchFormModule } from "../../common/modules/chip-search-form/chip-search-form.module";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PreventStartingSpaceModule } from "src/app/directives/prevent-starting-space/prevent-starting-space.module";

const PIPES = [GetControlModule];
const CUSTOM_MODULES = [
  SuccessPopupModule,
  BackendErrorModule,
  SearchFilterModule,
  SelectJobareaModule,
  ChipSearchFormModule,
];
const DIRECTIVES = [
  TrimDirectiveModule,
  NumberOnlyModule,
  PreventStartingSpaceModule,
];

const MATERIAL = [MatTooltipModule];

@NgModule({
  declarations: [
    ProfileSetupComponent,
    StepsOneComponent,
    StepsTwoComponent,
    StepsThreeComponent,
  ],
  imports: [
    CommonModule,
    ProfileSetupRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    ValidationErrorPipeModule,
    TrimValuesModule,
    GoogleMapModule,
    SwiperModule,
    ...PIPES,
    ...CUSTOM_MODULES,
    ...DIRECTIVES,
    ...MATERIAL,
  ],
  providers: [ProfileSetupService],
})
export class ProfileSetupModule {}
