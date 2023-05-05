import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApplicantFilterComponent } from "./applicant-list/applicant-filter/applicant-filter.component";
import { msg } from "./applicant.constant";

@Component({
  selector: "app-applicant",
  templateUrl: "./applicant.component.html",
  styleUrls: ["./applicant.component.scss"],
})
export class ApplicantComponent implements OnInit {
  constructor() {
    console.log("msg", msg);
  }

  ngOnInit(): void {}
}
