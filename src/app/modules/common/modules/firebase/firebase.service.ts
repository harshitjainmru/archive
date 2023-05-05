import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { DEVICE_TYPE, NOTIFICATION_STATUS } from 'src/app/constants/enums';
import { FCM_TOKEN_UPDATE } from 'src/app/constants/urls';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private httpService: HttpService,
    private utilityService: UtilityService
  ) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        // console.log("----------", _messaging)
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Browser/ device will ask to user for permission to receive notification
   */
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log('fcm------token');
        this.utilityService.setFCMToken(token);
        const bearTkn = this.utilityService.getAuthToken();
        if (token && this.utilityService.getAuthToken()) {
          this.fcmTokenUpdate(token);
        }
        // console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * This function will triggered when new massage has received.
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

  // This function will triggered for fcn token update
  async fcmTokenUpdate(deviceToken) {
    // console.log("fcm token update")
    if (deviceToken && this.utilityService.getAuthToken()) {
      const body = {
        deviceToken,
        deviceId: 'IP',
        deviceType: DEVICE_TYPE.web,
        notificationEnabled: NOTIFICATION_STATUS.ENABLE,
      };
      try {
        const resp = await this.httpService
          .put(FCM_TOKEN_UPDATE, body)
          .toPromise();
        // console.log(resp)
      } catch (error) {}
    }
  }
}
