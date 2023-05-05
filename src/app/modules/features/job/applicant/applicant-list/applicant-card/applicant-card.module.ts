import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicantCardComponent } from "./applicant-card.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SkillsTooltipPipe } from "./skills-tooltip.pipe";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { ImageFallbackModule } from "src/app/directives/image-fallback/image-fallback.module";
import { UnderDevModule } from "src/app/directives/under-dev/under-dev.module";
import { RatingReviewPopupModule } from "src/app/modules/common/modules/rating-review-popup/rating-review-popup.module";
import { MatDialogModule } from "@angular/material/dialog";
import { CreateRequestModule } from "src/app/modules/features/user/request-module/create-request/create-request.module";

const MATERIAL = [MatMenuModule, MatCheckboxModule, MatTooltipModule];
const PIPES = [CustomDatePipeModule];
@NgModule({
  declarations: [ApplicantCardComponent, SkillsTooltipPipe],
  imports: [
    CommonModule,
    ...MATERIAL,
    ...PIPES,
    ImageFallbackModule,
    UnderDevModule,
    RatingReviewPopupModule,
    MatDialogModule,
    CreateRequestModule,
  ],
  exports: [ApplicantCardComponent],
})
export class ApplicantCardModule {}
