import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicantStatusPipe } from "./applicant-status.pipe";

@NgModule({
  declarations: [ApplicantStatusPipe],
  imports: [CommonModule],
  exports: [ApplicantStatusPipe],
})
export class ApplicantStatusPipeModule {}
