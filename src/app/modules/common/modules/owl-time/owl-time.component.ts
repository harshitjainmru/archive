import { Component, OnInit, Input } from '@angular/core';
import { ITime } from 'src/app/models/common.interface';
import { OwlDateTime } from 'ng-pick-datetime/date-time/date-time.class';

@Component({
  selector: 'app-owl-time',
  templateUrl: './owl-time.component.html',
  styleUrls: ['./owl-time.component.scss'],
})
export class OwlTimeComponent implements OnInit {
  @Input() owlDateTimeConfig: ITime;

  constructor() {}

  // On init life cycle hook
  ngOnInit(): void {
    if (this.owlDateTimeConfig && this.owlDateTimeConfig.startTime.value) {
      this.owlDateTimeConfig.startAt = this.owlDateTimeConfig.startTime.value;
    }
  }

  startTimeChange(startTime: OwlDateTime<any>) {
    console.log('kookoko', startTime);
  }

  endTimeChange(endTime: OwlDateTime<any>) {
    console.log('kokook', endTime);
  }
}
