import { Directive, Inject, Input, Injectable } from '@angular/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY, MatDateRangeSelectionStrategy, DateRange } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { UtilityService } from 'src/app/services/utility.service';



@Injectable()
export class MaxRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
    start: any;
    public delta: number

    constructor(
        private _dateAdapter: DateAdapter<D>,
        private utility:UtilityService
    ) {}

    selectionFinished(date: D, currentRange: DateRange<D>) {
        let { start, end } = currentRange;
        if (start == null || (start && end)) {
            start = date;
            end = null;
        } else if (end == null) {
            const maxDate = this._dateAdapter.addCalendarDays(start, this.delta);
            if(date < start){
              end = null;
            }else{
              end = date ? date > maxDate ? maxDate : date : null;
            }
        }

        return new DateRange<D>(start, end);
    }

    createPreview(activeDate: D | null, currentRange: DateRange<D>): DateRange<D> {
        if (currentRange.start && !currentRange.end) {
            const maxDate = this._dateAdapter.addCalendarDays(currentRange.start, this.delta);
            const rangeEnd = activeDate ? activeDate > maxDate ? maxDate : activeDate : null;
            if(activeDate && activeDate > maxDate){
              this.utility.showAlert('Max date range limit exhausted !', 500);
            }
            return new DateRange(currentRange.start, rangeEnd);
        }

        return new DateRange<D>(null, null);
    }
}


@Directive({
  selector: '[appCalendarMaxRange]',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: MaxRangeSelectionStrategy
    }
  ]
})
export class CalendarMaxRangeDirective {

  constructor(
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    private maxRangeStrategy: MaxRangeSelectionStrategy<any>
  ) {}
  @Input() set appCalendarMaxRange(value: number) {

    this.maxRangeStrategy.delta = +value || 7;
  }

}
