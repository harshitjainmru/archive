import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent implements OnInit {
  @Input() placeholder = '';
  @Input() pickerType = 'timer';
  @Input() pickerTitle = '';
  @Input() maxDate = '';
  @Input() minDate = '';
  @Input() dataTimeCtrl: FormControl;
  @Output() pickerClosed = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  // This will close the date picker
  onPickerClosed(event: any) {
    this.pickerClosed.emit(this.dataTimeCtrl.value);
  }
}
