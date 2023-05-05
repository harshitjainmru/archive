import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-shortlisted',
  templateUrl: './profile-shortlisted.component.html',
  styleUrls: ['./profile-shortlisted.component.scss']
})
export class ProfileShortlistedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProfileShortlistedComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
