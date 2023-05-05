import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DAY_DATA } from 'src/app/constants/constant';
import { getISOString } from 'src/app/constants/helper-methods';
import { FormService } from 'src/app/services/form.service';
import { ShiftService } from '../service/shift.service';
import { ShiftSuccessPopupComponent } from '../shift-success-popup/shift-success-popup.component';

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.scss']
})
export class EditShiftComponent implements OnInit {
  shiftForm: FormGroup;
  daysList = JSON.parse(JSON.stringify(DAY_DATA));
  selectedDays: Array<string> = [];
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private shiftService: ShiftService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EditShiftComponent>) { }

  ngOnInit(): void {

    this.createForm();
    if (this.data) {
      this.patchValues();
    }

  }

  patchValues() {
    this.nameCtrl.setValue(this.data.name);
    this.starttimeCtrl.setValue((this.getDateObject(this.data.startTime)));
    this.endTimeCtrl.setValue((this.getDateObject(this.data.endTime)));
    this.setWeakDays(this.data.weekDays);
  }

  setWeakDays(data: Array<string>) {
    data.forEach(item => {
      for (let i = 0; i < this.daysList.length; i++) {
        if (item == this.daysList[i].value) {
          this.selectedDays.push(this.daysList[i].value);
          this.daysList[i].checked = true;
          break;
        }
      }
    })
  }

  createForm() {
    this.shiftForm = this.fb.group({
      name: this.formService.getControl("name"),
      startTime: this.formService.getControl("dropdown"),
      endTime: this.formService.getControl("dropdown"),
      weekDays: [''],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSuccessshift(): void {
    const dialogRef = this.dialog.open(ShiftSuccessPopupComponent, {
      width: '400px',
      data: this.data
    });

  }

  goBack() {
    history.back()
  }

  closeMe() {
    this.dialogRef.close()
  }

  /**
   * Gets date object
   * @param data 
   * @returns date of date object 
   */
  getDateObject(data: string): Date {
    return new Date(data) as Date;
  }

  get nameCtrl(): FormControl {
    return this.shiftForm.get('name') as FormControl;
  }
  get starttimeCtrl(): FormControl {
    return this.shiftForm.get('startTime') as FormControl;
  }

  get endTimeCtrl(): FormControl {
    return this.shiftForm.get('endTime') as FormControl;
  }

  onDayChecked(checked: boolean, day) {
    if (checked) {
      this.selectedDays.push(day.value)
    } else {
      this.selectedDays.splice(this.selectedDays.indexOf(day), 1)
    }
  }

  formData() {
    return JSON.parse(JSON.stringify(this.shiftForm.value));
  }

  onPickerClosed(event: any, type: string) {
    // console.log(type, "gelllllllllll");
    // console.log(event, "sncjksdncjkn");
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
    console.log(body, "this.shiftForm");

    this.shiftService.updateShift({ ...body, shiftId: this.data['_id'] }).then(resp => {
      console.log(resp, "resp");
      this.dialogRef.close(resp);
      this.data = resp['data'];
      this.openSuccessshift();
    }).catch(err => {
      console.log(err, "Error");
    })

  }

}
