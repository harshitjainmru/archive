import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { POPUP_MESSAGES } from 'src/app/constants/messages';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpService } from 'src/app/services/http.service';
import { ACCOUNT_API_GROUP } from 'src/app/constants/urls';
import { Router } from '@angular/router';
import { USER_PROFILE, WELCOME } from 'src/app/constants/routes';
import { IPopupData } from 'src/app/models/popup';

@Component({
  selector: 'app-unverified-popup',
  templateUrl: './unverified-popup.component.html',
  styleUrls: ['./unverified-popup.component.scss'],
})
export class UnverifiedPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UnverifiedPopupComponent>,
    private utilityService: UtilityService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Close dialog
  close() {
    this.dialogRef.close();
  }

  //Logout user account and navigate welcome page
  logOut() {
    let data: IPopupData = {
      title: POPUP_MESSAGES.confrim,
      message: POPUP_MESSAGES.logoutConfirmation,
      cancelButtonText: POPUP_MESSAGES.close,
      hideConfirmButton: true,
    };
    this.utilityService.openDialog(data).subscribe(async (resp) => {
      if (!!resp) {
        try {
          await this.http
            .patch(ACCOUNT_API_GROUP.LOGOUT, {}, { showLoader: true })
            .toPromise();
          this.utilityService.clearStorage();
          this.router.navigate([WELCOME.fullUrl]);
          window.location.reload();
        } catch (error) {}
      }
    });
  }

  // This will navigate user profile page
  navigateToProfile() {
    this.router.navigate([USER_PROFILE.fullUrl]);
    this.close();
  }
}
