import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-success-popup",
  templateUrl: "./success-popup.component.html",
  styleUrls: ["./success-popup.component.scss"],
})
export class CompanyDetailsSuccessPopupComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CompanyDetailsSuccessPopupComponent>
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close(true);
  }
}
