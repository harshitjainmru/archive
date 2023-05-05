import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DAY_NAME } from 'src/app/constants/constant';
import { getISOString } from 'src/app/constants/helper-methods';
import { SHIFT_LIST } from 'src/app/constants/routes';
import { FormService } from 'src/app/services/form.service';
import { ShiftService } from '../service/shift.service';
import { ShiftSuccessPopupComponent } from '../shift-success-popup/shift-success-popup.component';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {
  readonly today: Date = new Date();
  shiftForm: FormGroup;
  dayName = DAY_NAME;
  selectedDays: Array<string> = [];
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _formService: FormService,
    private _shiftService: ShiftService,
    private dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    this.shiftForm = this._fb.group({
      name: this._formService.getControl("name"),
      startTime: this._formService.getControl("dropdown"),
      endTime: this._formService.getControl("dropdown"),
      weekDays: [''],
    })
  }

  openSuccessshift(shift): void {
    const dialogRef = this.dialog.open(ShiftSuccessPopupComponent, {
      width: '400px',
      data: shift
    });

  }

  goBack() {
    this.router.navigate([SHIFT_LIST.fullUrl])
    // history.back()
  }

  get starttimeCtrl(): FormControl {
    return this.shiftForm.get('startTime') as FormControl;
  }

  get endTimeCtrl(): FormControl {
    return this.shiftForm.get('endTime') as FormControl;
  }

  onDayChecked(checked: boolean, day: string) {
    if (checked) {
      this.selectedDays.push(day)
    } else {
      this.selectedDays.splice(this.selectedDays.indexOf(day), 1)
    }
  }

  formData() {
    return JSON.parse(JSON.stringify(this.shiftForm.value));
  }

  onPickerClosed(event: any, type: string) {
    const startDateValue = this.starttimeCtrl.value;
    const endDateValue = this.endTimeCtrl.value;
    const startDate = new Date(this.starttimeCtrl.value);
    const endDate = new Date(this.endTimeCtrl.value);
    if (type == 'start') {
      const de = new Date(endDate.getTime() - 60000);
      if ((startDateValue && endDateValue) && (startDate > de)) {
        this.endTimeCtrl.setValue(null);
      }
    } else {
      const ds = new Date(endDate.getTime() - 60000);
      if ((startDateValue && endDateValue) && (ds < startDate)) {
        this.starttimeCtrl.setValue(null);
      }
    }
  }

  onSubmit() {

    if (this.shiftForm.invalid) return;
    if (!this.selectedDays.length) {
      alert('Please select week days');
      return;
    }

    const body = this.formData();
    body['startTime'] = getISOString(body['startTime']);
    body['endTime'] = getISOString(body['endTime']);
    body['weekDays'] = this.selectedDays;

    this._shiftService.createShift(body).then(resp => {
      this.openSuccessshift(body);
    }).catch(err => {
      console.log(err, "Error");
    })

  }
}
