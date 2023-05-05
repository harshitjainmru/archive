import { Component, OnInit, Input } from '@angular/core';
import { ScheduleDropdown } from 'src/app/models/common.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import * as moment from 'moment';
import { SCHEDULE_JOB_STATUS } from 'src/app/constants/enums';

@Component({
  selector: 'app-select-schedule-dropdown',
  templateUrl: './select-schedule-dropdown.component.html',
  styleUrls: ['./select-schedule-dropdown.component.scss'],
})
export class SelectScheduleDropdownComponent implements OnInit {
  @Input() dropdownConfig: FormGroup;

  selectedControl: FormControl = new FormControl('');
  SCHEDULE_JOB_STATUS = SCHEDULE_JOB_STATUS;

  constructor() {}

  // On init life cycle hook
  ngOnInit(): void {
    this.selectedControl.setValue('');
    if (this.dropdownConfig) {
      this.selectedControl.setValue(this.dropdownConfig.get('control').value);
      console.log('******', this.dropdownConfig);
    }
  }

  // This will compare select value and option value
  compareValues(SelectedValue: any, optionValue: any): boolean {
    return SelectedValue && optionValue
      ? SelectedValue.timeSlotsId === optionValue.timeSlotsId
      : SelectedValue === optionValue;
  }

  // Change event object that is emitted when the select value has changed.
  optionChanged(event: MatSelectChange) {
    let hours = 0;
    if (event.value.startTime && event.value.endTime) {
      const duration = moment.duration(
        moment(event.source.value.endTime).diff(moment(event.value.startTime))
      );
      hours = duration.asHours();
    }
    this.dropdownConfig
      .get('control')
      .setValue({ ...this.selectedControl.value, totalHours: hours });
    console.log('helloooo', this.dropdownConfig);
  }
}
