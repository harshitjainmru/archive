import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
interface IDate {
  label: string;
  fromDate: FormControl;
  toDate: FormControl;
  maxFromDate?: Date;
  maxToDate?: Date;
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit {
  minDate: Date;
  @Input() dateObject: IDate;
  constructor() {}

  // On init life cycle hook
  ngOnInit() {
    if (!('maxFromDate' in this.dateObject)) {
      this.dateObject.maxFromDate = new Date();
    }
    if (!('maxToDate' in this.dateObject)) {
      this.dateObject.maxToDate = new Date();
    }
  }

  /*
    Method For Detecting Filter From Date Change
  */
  dateChange(event: MatDatepickerInputEvent<Date>) {
    let dateValue = event.value;
    let minFromDate = new Date(dateValue);
    this.minDate = new Date(
      minFromDate.getFullYear(),
      minFromDate.getMonth(),
      minFromDate.getDate()
    );
    this.dateObject.toDate.setValue('');
  }

  // Method For Set Date
  setToDate() {
    if (this.dateObject.toDate.value) {
      let to = new Date(this.dateObject.toDate.value);
      to.setHours(23);
      to.setMinutes(59);
      to.setSeconds(59);
      this.dateObject.toDate.setValue(to);
    }
  }
}
