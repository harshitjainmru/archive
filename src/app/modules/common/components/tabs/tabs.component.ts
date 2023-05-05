import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabInfo;
  @Input() big;
  headerTabs;
  @Output() tabClicked = new EventEmitter();
  @Input() set tabs(value) {
    this.headerTabs = value;
  }

  constructor() {

  }
  ngOnInit() {

  }

  /**
   * Determines whether click 
   * @param link string
   */
  onClick(link) {
    this.tabClicked.emit(link);
  }

  // openTabs() {
  //   if (this.tabName === 'appointments') {
  //     this.navLinks = [
  //       { path: '/my-appointments/pending/', label: 'Pending', badge: this.badgeCount ? this.badgeCount.pendingRequests : '' },
  //       { path: '/my-appointments/upcoming/', label: 'Upcoming', badge: this.badgeCount ? this.badgeCount.upcomingRequests : '' },
  //       { path: '/my-appointments/completed/', label: 'Completed' },
  //       { path: '/my-appointments/cancel-request/', label: 'Cancel Request', badge: this.badgeCount ? this.badgeCount.cancelRequests : '' },
  //       { path: '/my-appointments/cancelled/', label: 'Cancelled' },
  //       { path: '/my-appointments/waitlisted/', label: 'Waitlists', badge: this.badgeCount ? this.badgeCount.waitlistRequests : '' },
  //     ];
  //   }
  // }
}

