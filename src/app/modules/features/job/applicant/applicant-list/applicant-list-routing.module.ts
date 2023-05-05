import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ApplicantListComponent } from "./applicant-list.component";

const routes: Routes = [{ path: "", component: ApplicantListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantListRoutingModule {}
