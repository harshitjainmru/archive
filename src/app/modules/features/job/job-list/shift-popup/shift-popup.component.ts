import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DATE_FORMATS } from "src/app/constants/constant";

@Component({
  selector: "app-shift-popup",
  templateUrl: "./shift-popup.component.html",
  styleUrls: ["./shift-popup.component.scss"],
})
export class ShiftPopupComponent implements OnInit {
  jobsite;
  dFormat = DATE_FORMATS;
  constructor(
    public dialogRef: MatDialogRef<ShiftPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(data.timeslots);
  }

  ngOnInit(): void {}
}
