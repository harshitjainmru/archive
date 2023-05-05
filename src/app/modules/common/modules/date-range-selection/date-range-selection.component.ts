import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import { IDateRange } from 'src/app/models/common.interface';
import { UtilityService } from 'src/app/services/utility.service';

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD MMM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-range-selection',
  templateUrl: './date-range-selection.component.html',
  styleUrls: ['./date-range-selection.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
})
export class DateRangeSelectionComponent implements OnInit {
  @Input() dateRangeConfig: IDateRange;
  @Input() searchSortFilter: FormGroup;

  dateRangeform: FormGroup;
  maxDate: Date = moment().toDate();

  @Output() _emitdateRangechanged = new EventEmitter();

  constructor(
    private utilityService: UtilityService,
    private formBuilder: FormBuilder
  ) {}

  // On init life cycle hook
  ngOnInit(): void {
    if (!this.dateRangeConfig) {
      this.dateRangeConfig = {
        startDate: new FormControl(''),
        endDate: new FormControl(''),
      };
      const { fromDate, toDate } = this.utilityService.getStartAndToday();

      this.dateRangeConfig.startDate.setValue(fromDate);
      this.dateRangeConfig.endDate.setValue(toDate);
    } else {
      this.dateRangeConfig.startDate.setValue(
        moment(this.dateRangeConfig.startDate.value).toDate()
      );
      this.dateRangeConfig.endDate.setValue(
        moment(this.dateRangeConfig.endDate.value).toDate()
      );
    }

    this.dateRangeform = this.formBuilder.group({
      startDate: this.dateRangeConfig.startDate as FormControl,
      endDate: this.dateRangeConfig.endDate as FormControl,
    });
    // let d=this.dateRangeConfig.startDate.value
    // console.log(d)
    if (this.dateRangeConfig?.maxDateRange) {
      this.maxDate = this.dateRangeConfig?.maxDateRange;
    }
  }

  // This will update date range
  updateDateRangeSelection(event: { startDate: Date; endDate: Date }) {
    this.dateRangeConfig.startDate.setValue(moment(event.startDate).toDate());
    this.dateRangeConfig.endDate.setValue(moment(event.endDate).toDate());
    console.log(this.dateRangeConfig);
  }

  // This will  change date range
  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    if (dateRangeStart.value && dateRangeEnd.value) {
      this._emitdateRangechanged.emit(true);
    }
  }

  ngAfterViewInit() {}
}
