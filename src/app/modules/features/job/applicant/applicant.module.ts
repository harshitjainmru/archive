import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ApplicantRoutingModule } from "./applicant-routing.module";
import { ApplicantComponent } from "./applicant.component";
import { ApplicantCardModule } from "./applicant-list/applicant-card/applicant-card.module";
@NgModule({
  declarations: [ApplicantComponent],
  imports: [CommonModule, ApplicantRoutingModule],
})
export class ApplicantModule {
  constructor(){
    console.log("in applicant module");
    
  }
}
