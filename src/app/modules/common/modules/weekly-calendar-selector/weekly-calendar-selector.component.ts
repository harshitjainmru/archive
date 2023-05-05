import {
  Component,
  OnInit,
  Injectable,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import * as moment from 'moment';
import { IDateRange } from 'src/app/models/common.interface';
import { FormControl } from '@angular/forms';
import { WEEK_UPDATE } from 'src/app/constants/enums';
import { UtilityService } from 'src/app/services/utility.service';

@Injectable()
export class FiveDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  // This will create date range with five days
  public _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const startOfWeek = this._dateAdapter.getDayOfWeek(date) - 1;
      const startDate = this._dateAdapter.addCalendarDays(date, -startOfWeek);
      const endOfWeek = this._dateAdapter.addCalendarDays(startDate, 6);

      return new DateRange<D>(startDate, endOfWeek);
    }

    return new DateRange<D>(null, null);
  }
}

@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
}

export const MY_FORMATS = {
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
  selector: 'app-weekly-calendar-selector',
  templateUrl: './weekly-calendar-selector.component.html',
  styleUrls: ['./weekly-calendar-selector.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class WeeklyCalendarSelectorComponent implements OnInit {
  @Output() _emitDateChanged = new EventEmitter();

  @Input() dateRangeConfig: IDateRange;

  constructor(private utilService: UtilityService) {}

  // On init life cycle hook
  ngOnInit(): void {
    if (!this.dateRangeConfig) {
      this.dateRangeConfig = {
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        iSaveAllowed: new FormControl(''),
      };
      // const currentDate = moment(new Date());
      const startOfWeek = moment().startOf('isoWeek').toDate();
      const endOfWeek = moment().endOf('isoWeek').toDate();
      this.dateRangeConfig.startDate.setValue(startOfWeek);
      this.dateRangeConfig.endDate.setValue(endOfWeek);
      this.dateRangeConfig.iSaveAllowed.setValue(true);
    } else {
      this.dateRangeConfig.startDate.setValue(
        moment(this.dateRangeConfig.startDate.value).toDate()
      );
      this.dateRangeConfig.endDate.setValue(
        moment(this.dateRangeConfig.endDate.value).toDate()
      );
      if (
        moment(this.dateRangeConfig.endDate.value).toDate() <
        moment(new Date()).startOf('isoWeek').toDate()
      ) {
        this.dateRangeConfig.iSaveAllowed.setValue(false);
      } else {
        this.dateRangeConfig.iSaveAllowed.setValue(true);
      }
    }
    // this.listenDateChanges()
  }

  // This will use for date and emit the _emitDateChanged value
  dateChange(event: MatDatepickerInputEvent<any>) {
    if (event.targetElement.classList.contains('mat-start-date')) {
      this.dateRangeConfig.startDate.setValue(event.value);
      if (
        moment(event.value).toDate() <
        moment(new Date()).startOf('isoWeek').toDate()
      ) {
        this.dateRangeConfig.iSaveAllowed.setValue(false);
      } else {
        this.dateRangeConfig.iSaveAllowed.setValue(true);
      }
    } else {
      this.dateRangeConfig.endDate.setValue(event.value);
    }
    this._emitDateChanged.emit(true);
  }

  // This will update week
  updateWeekIncDecreement(type: number) {
    const currentStartWeek = moment(this.dateRangeConfig.startDate.value)
      .startOf('isoWeek')
      .toDate();
    const currentEndWeek = moment(this.dateRangeConfig.endDate.value)
      .endOf('isoWeek')
      .toDate();
    let startOfWeek, endOfWeek;
    if (type === WEEK_UPDATE.INCREEMENT) {
      startOfWeek = moment(currentEndWeek).add('day', 1).toDate();
      endOfWeek = moment(currentEndWeek)
        .add('day', 1)
        .endOf('isoWeek')
        .toDate();
    } else if (type === WEEK_UPDATE.DECREEMENT) {
      startOfWeek = moment(currentStartWeek)
        .subtract('day', 1)
        .startOf('isoWeek')
        .toDate();
      endOfWeek = moment(currentStartWeek).subtract('day', 1).toDate();
    }

    if (endOfWeek < moment(new Date()).startOf('isoWeek').toDate()) {
      this.dateRangeConfig.iSaveAllowed.setValue(false);
    } else {
      this.dateRangeConfig.iSaveAllowed.setValue(true);
    }

    this.dateRangeConfig.startDate.setValue(startOfWeek);
    this.dateRangeConfig.endDate.setValue(endOfWeek);

    this._emitDateChanged.emit(true);
  }
}
