import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchApplicantComponent } from "./search-applicant.component";
import { RouterModule, Routes } from "@angular/router";
import { SEARCH_APPLICANT_LIST } from "src/app/constants/routes";
import { ApplicantService } from "../applicant/applicant.service";

const routes: Routes = [
  {
    path: "",
    component: SearchApplicantComponent,
    children: [
      {
        path: `:jobId/${SEARCH_APPLICANT_LIST.path}`,
        redirectTo: `:jobId/${SEARCH_APPLICANT_LIST.path}/APPLIED`,
        pathMatch: "full",
      },

      {
        path: `:jobId/${SEARCH_APPLICANT_LIST.path}/:status`,
        loadChildren: () =>
          import("./search-applicant-list/search-applicant-list.module").then(
            (m) => m.SearchApplicantListModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [SearchApplicantComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SearchApplicantModule {}
