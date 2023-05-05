import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NOTIFICATION_LIST_GET, NOTIFICATION_READ_STATUS_PUT } from 'src/app/constants/urls';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  newNotification=new BehaviorSubject(false);
  constructor(
    private http:HttpService
  ) { }

  /**
   * Gets notification list
   * @param params page and limit
   * @returns  
   */
  getNotificationList(params)
  {
    return this.http.get<any>(NOTIFICATION_LIST_GET,params,{showLoader:true});
  }

  /**
   * Sets notification read status
   * @param body {notificationId,isRead}
   * @returns  
   */
  setNotificationReadStatus(body,loader:boolean=true)
  {
    return this.http.put<any>(NOTIFICATION_READ_STATUS_PUT,body,{showLoader:loader});
  }

}
