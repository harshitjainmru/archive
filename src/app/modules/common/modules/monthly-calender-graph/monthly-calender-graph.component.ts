import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CustomDatePipe } from 'src/app/pipes/custom-date/custom-date.pipe';

@Component({
  selector: 'app-monthly-calender-graph',
  templateUrl: './monthly-calender-graph.component.html',
  styleUrls: ['./monthly-calender-graph.component.scss'],
})
export class MonthlyCalenderGraphComponent implements OnInit {
  sixMonthsAgo;
  monthEndControl: FormControl = new FormControl();
  monthStartControl: FormControl = new FormControl();
  infoString = '';
  cstmDate = new CustomDatePipe();
  today = new Date();
  tenYearsBefore = new Date();
  @Output() monthChanged = new EventEmitter();
  constructor() {
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);
    console.log(this.today);

    this.tenYearsBefore.setFullYear(this.today.getFullYear() - 10);
    this.tenYearsBefore.setHours(0);
    this.tenYearsBefore.setMinutes(0);
    this.tenYearsBefore.setSeconds(0);
    this.tenYearsBefore.setMilliseconds(0);
    console.log(this.today);

    this.monthEndControl.setValue(moment().endOf('month').toDate());
    if (moment(this.monthEndValue).month() == 0) {
      this.infoString = `One month ending`;
      this.monthStartControl.setValue(moment().startOf('month').toDate());
    } else if (moment(this.monthEndValue).month() == 1) {
      this.infoString = `Two months ending`;
      this.monthStartControl.setValue(
        moment().subtract(1, 'month').startOf('month').toDate()
      );
    } else {
      this.infoString = `Three months ending`;
      this.monthStartControl.setValue(
        moment().subtract(2, 'month').startOf('month').toDate()
      );
    }
  }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  dateChange(event) {
    console.log(event);
  }

  // On init life cycle hook
  ngOnInit(): void {
    // this.monthChanged.emit({
    //   monthStartDate: this.monthStartControl.value,
    //   monthEndDate: this.monthEndControl.value,
    // });
  }

  // This will open date picker
  openDatePicker(dp) {
    dp.open();
  }

  // This will get months end value
  get monthEndValue() {
    return this.monthEndControl.value;
  }

  // This will close date picker
  closeDatePicker(eventData: any, dp?: any) {
    let endOfMonth = moment(eventData).endOf('month').toDate();

    this.monthEndControl.setValue(endOfMonth);

    if (moment(this.monthEndValue).month() == 0) {
      this.infoString = `One month ending`;
      this.monthStartControl.setValue(moment().startOf('month').toDate());
    } else if (moment(this.monthEndValue).month() == 1) {
      this.infoString = `Two months ending `;
      this.monthStartControl.setValue(
        moment().subtract(1, 'month').startOf('month').toDate()
      );
    } else {
      this.infoString = `Three months ending`;
      this.monthStartControl.setValue(
        moment().subtract(2, 'month').startOf('month').toDate()
      );
    }
    this.monthChanged.emit({
      monthStartDate: this.monthStartControl.value,
      monthEndDate: this.monthEndControl.value,
    });
    // get month and year from eventData and close datepicker, thus not allowing user to select date
    dp.close();
  }

  // This will trigger on current to next  graph
  next() {
    let endOfMonth = moment(this.monthEndControl.value)
      .add(2, 'month')
      .endOf('month')
      .toDate();
    let startOfMonth = moment(endOfMonth)
      .subtract(2, 'month')
      .startOf('month')
      .toDate();
    console.log(startOfMonth, endOfMonth);

    this.monthEndControl.setValue(endOfMonth);
    this.monthStartControl.setValue(startOfMonth);
  }

  // This will trigger on previous graph
  previous() {
    let endOfMonth = moment(this.monthEndControl.value)
      .subtract(2, 'month')
      .endOf('month')
      .toDate();
    let startOfMonth = moment(endOfMonth)
      .subtract(2, 'month')
      .startOf('month')
      .toDate();
    console.log(startOfMonth, endOfMonth);

    this.monthEndControl.setValue(endOfMonth);
    this.monthStartControl.setValue(startOfMonth);
  }
}
