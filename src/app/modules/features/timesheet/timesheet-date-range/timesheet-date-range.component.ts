import {
  Component,
  OnInit,
  Injectable,
  EventEmitter,
  Output,
  Input,
  AfterViewInit
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
  IDate, IDateRange
} from 'src/app/models/common.interface';
import * as moment from 'moment';
import {
  MONTH_UPDATE
} from 'src/app/constants/enums';
import {
  FormControl, FormGroup, FormBuilder
} from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';
import { debounceTime } from 'rxjs/operators';
import { TimesheetService } from '../timesheet.service';


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
  selector: 'app-timesheet-date-range',
  templateUrl: './timesheet-date-range.component.html',
  styleUrls: ['./timesheet-date-range.component.scss'],
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
export class TimesheetDateRangeComponent implements OnInit, AfterViewInit {

  @Input() dateRangeConfig: IDateRange;
  @Input() searchSortFilter:FormGroup;

  dateRangeform:FormGroup;


  @Output() _emitdateRangechanged = new EventEmitter();


  constructor(
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private timesheetService:TimesheetService
  ) {

   }

  ngOnInit(): void {

    if (!this.dateRangeConfig) {
      this.dateRangeConfig = {
        startDate:new FormControl(''),
        endDate: new FormControl('')
      }
      const { fromDate, toDate} = this.utilityService.getStartAndToday();

      this.dateRangeConfig.startDate.setValue(fromDate);
      this.dateRangeConfig.endDate.setValue(toDate);
    } else {
      this.dateRangeConfig.startDate.setValue(moment(this.dateRangeConfig.startDate.value).toDate());
      this.dateRangeConfig.endDate.setValue(moment(this.dateRangeConfig.endDate.value).toDate());
    }

    this.dateRangeform = this.formBuilder.group({
      startDate:this.dateRangeConfig.startDate as FormControl,
      endDate: this.dateRangeConfig.endDate as FormControl
    })
  }


  updateDateRangeSelection(event:{startDate:Date,endDate:Date}) {
    this.dateRangeConfig.startDate.setValue(moment(event.startDate).toDate());
    this.dateRangeConfig.endDate.setValue(moment(event.endDate).toDate());


  }

  ngAfterViewInit() {
    this.dateRangeform.valueChanges.pipe(
        debounceTime(200)
    ).subscribe(event => {
        if (event.startDate && event.endDate) {
              
    const {fromDate, toDate, employeeId} = this.searchSortFilter.value;
    this.timesheetService.updateAttendanceStatus(this.utilityService.formatMomentData({fromDate,toDate,employeeId}));

            this._emitdateRangechanged.emit(true)
        }
    });
}

}
