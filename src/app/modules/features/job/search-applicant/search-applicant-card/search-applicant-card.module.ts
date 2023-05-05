import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchApplicantCardComponent } from "./search-applicant-card.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { SkillsTooltipPipe } from "./skills-tooltip.pipe";
import { ImageFallbackModule } from "src/app/directives/image-fallback/image-fallback.module";
import { UnderDevModule } from "src/app/directives/under-dev/under-dev.module";
import { TimePreferenceComponent } from './time-preference/time-preference.component';
import { RolesPipe } from './roles.pipe';
import { CreateRequestModule } from "../../../user/request-module/create-request/create-request.module";

const MATERIAL = [MatMenuModule, MatCheckboxModule, MatTooltipModule];
const PIPES = [CustomDatePipeModule];

@NgModule({
  declarations: [SearchApplicantCardComponent, SkillsTooltipPipe, TimePreferenceComponent, RolesPipe],
  imports: [
    CommonModule,
    ...MATERIAL,
    ...PIPES,
    ImageFallbackModule,
    UnderDevModule,
    CreateRequestModule
  ],
  exports: [SearchApplicantCardComponent],
})
export class SearchApplicantCardModule {}
