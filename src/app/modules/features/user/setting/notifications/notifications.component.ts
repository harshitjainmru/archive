import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NOTIFICATION_STATUS } from 'src/app/constants/enums';
import { AccountService } from 'src/app/modules/account/account.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationChecked:boolean=false;
  notificationToggleControl:FormControl;
  constructor(
    private _accountService: AccountService,
    private _profileService:UserProfileService
  ) {
    this.notificationToggleControl=new FormControl();
    this.setToggle();
   }

  ngOnInit(): void {
  }

  async notificationToggle(event){
    // console.log(event.checked)
    try {
      const body={
        notificationEnabled:event.checked?NOTIFICATION_STATUS.ENABLE:NOTIFICATION_STATUS.DISABLE
      }
      await this._accountService.onNotificationToggle(body).toPromise();
      await this._profileService.getProfileDetail(true)
      this.setToggle();
    } catch (error) {
      
    }
  }

  setToggle(){
    const {notificationEnabled}=this._profileService.profileData;
    this.notificationChecked=notificationEnabled===NOTIFICATION_STATUS.ENABLE
    this.notificationToggleControl.setValue(this.notificationChecked)
  }

}
