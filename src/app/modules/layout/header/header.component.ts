import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PAGE_OPTION } from "src/app/constants/constant";
import { NOTIFICATION_TYPE, PROFILE_STATUS } from "src/app/constants/enums";
import { UserProfileService } from "src/app/services/user-profile.service";
import { UtilityService } from "src/app/services/utility.service";
import { FirebaseService } from "../../common/modules/firebase/firebase.service";
import { AdminNotificationPopupComponent } from "./popups/admin-notification-popup/admin-notification-popup.component";
import { JobActionPopupComponent } from "./popups/job-action-popup/job-action-popup.component";
import { ScheduleShiftPopupComponent } from "./popups/schedule-shift-popup/schedule-shift-popup.component";
import { NotificationService } from "./service/notification.service";
import { UnverifiedPopupComponent } from '../../common/modules/unverified-popup/unverified-popup.component';
import { QrCodeComponent } from "../../features/user/qr-code/qr-code.component";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  addJobBtn: boolean = false;
  showSideView: boolean = false;
  panelSub: Subscription;
  toDay: Date = new Date();
  userDetails;
  notificationList: Array<{}> = [];
  NOTIFICATION_TYPE = NOTIFICATION_TYPE;
  newNotification: number = 0;
  notificationLimit: number = 10;
  nextNotification: boolean;
  constructor(
    public dialog: MatDialog,
    private utility: UtilityService,
    private userProfileService: UserProfileService,
    private router: Router,
    private notificationService: NotificationService,
    private firebase: FirebaseService
  ) {
    setInterval(() => {
      this.toDay = new Date();
    }, 60000);
    
  }

  ngOnInit(): void {
    this.getNotificationList();
    this.getToggle();
    this.getUserDetails();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.checRoute();
      }
    });
    this.checRoute();
    this.checkNewNotification();


    // this.checkFCMTokn();
  }

  checkNewNotification() {
    this.firebase.currentMessage.subscribe((value) => {
      if (value) {
        // this.newNotification=1;
        // console.log("notification---",this.newNotification);

        this.getNotificationList();
      }
    })
  }

  checRoute() {
    if (
      this.router.url.includes("/job/add") ||
      this.router.url.includes("/job/edit") ||
      this.utility.isJobCopy.value
    ) {
      this.addJobBtn = true;
    } else {
      this.addJobBtn = false;
    }
  }

  getToggle() {
    this.panelSub = this.utility.sidepanel.subscribe((flag) => {
      this.showSideView = !this.showSideView;
    });
  }

  getUserDetails() {
    this.userProfileService.listenProfile.subscribe((data) => {
      if (data) {
        this.userDetails = data;
        if(!this.userDetails.profileStatus || this.userDetails.profileStatus === PROFILE_STATUS.UNVERIFIED){
            const dialogRef = this.dialog.open(UnverifiedPopupComponent, {
              width: '410px',
            });
        
            dialogRef.afterClosed().subscribe(result => {
              // console.log('The dialog was closed');
            });
          
        }
      }
    });

    this.userProfileService.getProfileDetail().then((data) => {
      this.userDetails = data;
    });
  }

  logout() {
    this.userProfileService.logOutMe();
  }

  onToggleSideBar() {
    this.utility.sidepanel.next(false);
  }


  ngOnDestroy() {
    this.panelSub.unsubscribe();
  }
  openNotificationPopup(data): void {
    const { isRead ,type }=data
    const notificationId=data['_id'];
    // console.log(data,{ notificationId, isRead ,type })
    if (!isRead) {
      this.markReadNotification({ notificationId })
    }

    console.log(type)

    switch (type) {
      case NOTIFICATION_TYPE.ADMIN_NOTIFICATION:
        this.openNotificationDetailPopup(AdminNotificationPopupComponent,data);
        break;

        case NOTIFICATION_TYPE.SHIFT_ACTION_WORKER
        :
        this.openNotificationDetailPopup(ScheduleShiftPopupComponent,data);
        break;

        case NOTIFICATION_TYPE.JOB_ACTION_APPLIED:
          this.openNotificationDetailPopup(JobActionPopupComponent,data);
          break;
    
      default:
        this.openNotificationDetailPopup(AdminNotificationPopupComponent,data);
        break;
    }

    // const dialogRef = this.dialog.open(ScheduleShiftPopupComponent, {
    //   width: "692px",
    //   data:{}
    // });
  }

  openNotificationDetailPopup(popup,data){
    const dialogRef = this.dialog.open(popup, {
      width: "692px",
      data:data
    });
  }


  /**
   * Gets notification list
   * @returns notification list 
   */
  async getNotificationList(limit = 10): Promise<void> {
    let params = { page: 1, limit }
    try {
      const { data: { result, next, unreadCount } } = await this.notificationService.getNotificationList(params).toPromise();
      this.notificationList = result;
      this.nextNotification = next;
      this.newNotification = unreadCount
    } catch (error) {

    }
  }
  resetNewNotification() {
    this.newNotification = 0;
  }

  /**
   * call notification on scroll
   */
  onScroll() {
    // console.log("scroll trigered")
    this.notificationLimit += 10;
    if (this.nextNotification) {
      this.getNotificationList(this.notificationLimit);
    }
  }

  /**
   * Clears all notification
   */
  async clearAllNotification() {
    try {
      const body = { isClearAll: 1 }
      await this.setNotificationReadStatus(body);
    } catch (error) {

    }
  }

  async onDeleteNotification(event, { notificationId }) {
    event.stopPropagation();
    try {
      const body = { notificationId, isDelete: 1 }
      await this.setNotificationReadStatus(body);
      this.getNotificationList();
    } catch (error) {

    }
  }

  /**
   * Sets notification read status
   * @param body 
   */
  async setNotificationReadStatus(body) {

    try {
      const resp = await this.notificationService.setNotificationReadStatus(body).toPromise();
    } catch (error) {

    }
  }

  onBellIconClick() {
    this.getNotificationList();
  }

  /**
   * mark notification as read
   */
  markReadNotification({ notificationId }) {
    // if(!isRead){
    //   return;
    // }
    const body = { notificationId, isRead: 1 };
    console.log("-----",body)
    this.setNotificationReadStatus(body)

  }

  checkFCMTokn(){
    console.log('in checkFCM---',this.utility.getFCMToken())
    if(!this.utility.getFCMToken()){
      this.firebase.requestPermission();
    }
  }
  
  /**
   * Opens qr coode
   */
  async openQR(){
    const dialog= await this.dialog.open(QrCodeComponent,{
      width: "692px",
    data:{
      hideCloseBtn:false
    }
    }).afterClosed().toPromise();
  }

}
