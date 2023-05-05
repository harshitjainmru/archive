import { Directive, Inject, Input } from '@angular/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { MaxRangeSelectionStrategy } from 'src/app/modules/common/modules/date-range-selection/poviders/maxRangeSelectionStrategy';

@Directive({
  selector: '[maxRange]',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: MaxRangeSelectionStrategy
    }
  ]
})
export class MaxRangeDirective {

  constructor(
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    private maxRangeStrategy: MaxRangeSelectionStrategy<any>
  ) {}
  @Input() set maxRange(value: number) {
    this.maxRangeStrategy.delta = +value || 7;
  }

}
