import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';

@Component({
  selector: 'ps-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
})
export class ToastNotificationComponent implements OnInit, OnDestroy {
  open = false;
  notify: any;
  private subscription: Subscription;

  constructor(private _toast: ToastService) {}

  // On init life cycle hook
  ngOnInit() {
    this.subscription = this._toast.notification.subscribe((showState: any) => {
      this.notify = showState;
      this.open = false;
      this.open = true;
      setTimeout(() => {
        this.open = false;
      }, showState.time);
    });
  }

  // This will unsubscribe toast
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
