import {
  Component,
  OnInit,
  Injectable,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerInputEvent,
  MatDatepicker,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import {
  IDate
} from 'src/app/models/common.interface';
import * as moment from 'moment';
import {
  MONTH_UPDATE
} from 'src/app/constants/enums';
import {
  FormControl
} from '@angular/forms';


const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-monthly-selection',
  templateUrl: './monthly-selection.component.html',
  styleUrls: ['./monthly-selection.component.scss'],
  providers: [{
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
  ]
})
export class MonthlySelectionComponent implements OnInit {


  @Output() _emitMonthChanged = new EventEmitter();

  @Input() dateRangeConfig: IDate;

  constructor() {}

  ngOnInit(): void {
    if (!this.dateRangeConfig) {
      this.dateRangeConfig = {
        date: new FormControl(''),
      }
      // const currentDate = moment(new Date());
      const startOfMonth = moment().startOf('month').toDate();
      this.dateRangeConfig.date.setValue(startOfMonth);
    } else {
      this.dateRangeConfig.date.setValue(moment(this.dateRangeConfig.date.value).toDate());
    }
  }


  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.dateRangeConfig.date.value;
    ctrlValue.year(normalizedYear.year());
    this.dateRangeConfig.date.setValue(ctrlValue);

  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker < moment.Moment > ) {
    const ctrlValue = this.dateRangeConfig.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateRangeConfig.date.setValue(ctrlValue);
    datepicker.close();
  }


  updateWeekIncDecreement(type: number) {
    const selectedMonth = moment(this.dateRangeConfig.date.value).startOf('month').toDate();
    let startOfMonth;
    if (type === MONTH_UPDATE.INCREEMENT) {
      startOfMonth = moment(selectedMonth).add('month', 1).toDate();

    } else if (type === MONTH_UPDATE.DECREEMENT) {
      startOfMonth = moment(selectedMonth).subtract('month', 1).toDate();
    }


    this.dateRangeConfig.date.setValue(startOfMonth);

    this._emitMonthChanged.emit(true);

  }

}
