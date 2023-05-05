import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RANGE_UPDATE_TIME } from 'src/app/constants/constant';
import { IRange } from 'src/app/models/common.interface';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent implements OnInit {
  @Input() rangeConfig: IRange;

  someRange2 = [];

  // minValue = 0;
  // maxValue = 0;
  // show: boolean = false;
  // options: Options = {
  //   floor: 0,
  //   ceil: 100,
  //   step: 1,
  // };
  // valueUpdtae: Subject<any> = new Subject<any>();
  constructor() {
    // this.listenValueUpdate();
  }

  // On init life cycle hook
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.minValue = this.rangeConfig.min.value || 0;
    //   this.maxValue = this.rangeConfig.max.value || this.rangeConfig.maxTo;
    //   this.options = this.rangeConfig.option;
    //   this.show = true;
    // }, 0);
    // this.listenMinValueChange();
    // this.listenMaxValueChange();
  }

  // This will change range
  onChange(event) {
    this.rangeConfig.selectedMin.setValue(event[0]);
    this.rangeConfig.selectedMax.setValue(event[1]);
  }

  // listenMinValueChange() {
  //   this.rangeConfig.min.valueChanges
  //     .pipe(
  //       debounceTime(RANGE_UPDATE_TIME), // wait 1 sec after the last event before emitting last event
  //       distinctUntilChanged() // only emit if value is different from previous value
  //     )
  //     .subscribe((resp) => {
  //       if (resp) {
  //         this.minValue = resp;
  //       }
  //     });
  // }

  // listenMaxValueChange() {
  //   this.rangeConfig.max.valueChanges
  //     .pipe(
  //       debounceTime(RANGE_UPDATE_TIME), // wait 1 sec after the last event before emitting last event
  //       distinctUntilChanged() // only emit if value is different from previous value
  //     )
  //     .subscribe((resp) => {
  //       if (resp) {
  //         this.maxValue = resp;
  //       }
  //     });
  // }

  // listenValueUpdate() {
  //   console.log("lisussu");
  //   this.valueUpdtae
  //     .pipe(
  //       debounceTime(RANGE_UPDATE_TIME), // wait 1 sec after the last event before emitting last event
  //       distinctUntilChanged() // only emit if value is different from previous value
  //     )
  //     .subscribe((result: any) => {
  //       if (result) {
  //         this.rangeConfig.min.setValue(result.value);
  //         this.rangeConfig.max.setValue(result.highValue);
  //       }
  //     });
  // }
  // valueChanges(event) {
  //   this.valueUpdtae.next(event);
  // }
}
