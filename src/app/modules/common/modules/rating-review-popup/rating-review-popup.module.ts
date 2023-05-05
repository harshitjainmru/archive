import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RatingReviewPopupComponent } from "./rating-review-popup.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";

@NgModule({
  declarations: [RatingReviewPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    GetControlModule,
    ValidationErrorPipeModule,
  ],
  exports: [RatingReviewPopupComponent],
})
export class RatingReviewPopupModule {}
