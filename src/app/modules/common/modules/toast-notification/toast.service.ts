import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast = new Subject<any>();
  public notification = this.toast.asObservable();
  data = {
    title: '',
    msg: '',
    type: '',
    time: null,
  };

  constructor() {}

  // This will display success toast notification
  success(message, title?, time?: number) {
    this.data = {
      title: title,
      msg: message,
      type: '_success',
      time: time ? time : 5000,
    };
    if (message) {
      this.toast.next(this.data);
    }
  }

  // This will display info toast notification
  info(message, title?, time?: number) {
    this.data = {
      title: title,
      msg: message,
      type: '_info',
      time: time ? time : 5000,
    };
    if (message) {
      this.toast.next(this.data);
    }
  }

  //This will display warning message
  warning(message, title?, time?: number) {
    this.data = {
      title: title,
      msg: message,
      type: '_warning',
      time: time ? time : 4000,
    };
    if (message) {
      this.toast.next(this.data);
    }
  }

  // This will display error toast message
  error(message: string, title?: string, time?: number) {
    this.data = {
      title: title,
      msg: message,
      type: '_error',
      time: time ? time : 5000,
    };
    if (message) {
      this.toast.next(this.data);
    }
  }
}
