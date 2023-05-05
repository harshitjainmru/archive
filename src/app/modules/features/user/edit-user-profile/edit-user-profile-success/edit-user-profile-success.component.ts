import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit-user-profile-success",
  templateUrl: "./edit-user-profile-success.component.html",
  styleUrls: ["./edit-user-profile-success.component.scss"],
})
export class EditUserProfileSuccessComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditUserProfileSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close(true);
  }
}
