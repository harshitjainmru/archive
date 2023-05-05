import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ApplicantDetailsComponent } from "./applicant-details.component";

const routes: Routes = [{ path: "", component: ApplicantDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantDetailsRoutingModule {}
