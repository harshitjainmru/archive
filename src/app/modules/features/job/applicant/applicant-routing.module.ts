import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { APPLICANT_DETAILS, APPLICANT_LIST, SEARCH_APPLICANT_DETAILS } from "src/app/constants/routes";

import { ApplicantComponent } from "./applicant.component";

const routes: Routes = [
  {
    path: "",
    component: ApplicantComponent,
    children: [
      {
        path: `:jobId/${APPLICANT_LIST.path}`,
        pathMatch: "full",
        redirectTo: `:jobId/${APPLICANT_LIST.path}/APPLIED`,
      },
      {
        path: `:jobId/${APPLICANT_DETAILS.path}`,
        loadChildren: () =>
          import("./applicant-details/applicant-details.module").then(
            (m) => m.ApplicantDetailsModule
          ),
      },
      {
        path: `:jobId/${SEARCH_APPLICANT_DETAILS.path}`,
        loadChildren: () =>
          import("./applicant-details/applicant-details.module").then(
            (m) => m.ApplicantDetailsModule
          ),
      },
      {
        path: `:jobId/${APPLICANT_LIST.path}/:status`,
        loadChildren: () =>
          import("./applicant-list/applicant-list.module").then(
            (m) => m.ApplicantListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantRoutingModule {}
