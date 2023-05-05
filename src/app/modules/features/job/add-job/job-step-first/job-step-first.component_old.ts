// import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
// import { MatRadioChange } from '@angular/material/radio';
// import { MatSelectChange } from '@angular/material/select';
// import { JOB_LOCATION_TYPE, JOB_STEP_NUMBER } from 'src/app/constants/enums';
// import { SelectSearchComponent } from 'src/app/modules/common/modules/select-search/component/select-search/select-search.component';
// import { IStateCity } from '../add-job.model';
// import { JobService } from '../service/job.service';

// @Component({
//   selector: 'app-job-step-first',
//   templateUrl: './job-step-first.component.html',
//   styleUrls: ['./job-step-first.component.scss']
// })
// export class JobStepFirstComponent implements OnInit {
//   @ViewChild('scrollframe') scrollFrame: ElementRef;
//   @ViewChild(SelectSearchComponent) searchComponent: SelectSearchComponent;
//   @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirectiveOverride;

//   /////
//   @Output() step=new EventEmitter();
//   JOB_STEP_NUMBER=JOB_STEP_NUMBER

//   jobLocationType = JOB_LOCATION_TYPE;
//   scListsSingle: Array<IStateCity> = [];
//   scListsMulti: Array<IStateCity> = [];
//   firstStepForm: FormGroup;
//   jobAreaSiteGroup: FormGroup;
//   today = new Date();
//   userDetails;
//   @Input() set cityState(data) {
//     if (data) {
//       this.scListsSingle = data['single'] || [];
//       this.scListsMulti = data['multi'] || [];
//     }
//   }

//   constructor(public jobService: JobService) {
//     this.getUserDetails();
//   }

//   ngOnInit(): void {
//     this.firstStepForm = this.jobService.firstStepForm;
//     this.jobAreaSiteGroup = this.firstStepForm.get('jobAreaSite') as FormGroup;
//   }

//   getUserDetails() {
//     this.jobService.getProfileDetails().then(data => {
//       this.userDetails = data;
//     })
//   }

//   onJobAreaSelection(event: MatSelectChange) {
//     this.jobAreaSiteGroup.patchValue({ ...event.value, city: '', street: '', postalCode: '' });
//   }

//   onChangeJobLocation(event: MatRadioChange) {
//     this.jobAreaCtrl.reset();
//     this.jobAreaSiteGroup.reset()
//   }

//   get fromDateCtrl() {
//     return this.firstStepForm.get('startDate') as FormControl;
//   }

//   get toDateCtrl() {
//     return this.firstStepForm.get('endDate') as FormControl;
//   }

//   onSubmit() {
//     console.log(this.firstStepForm.value);
//   }

//   get stepOneformRef() {
//     return this.firstStepForm;
//   }

//   get jobAreaCtrl() {
//     return this.firstStepForm.get("jobArea") as FormControl;
//   }

//   get stepOneformData() {
//     this.formGroupDirective.submitted = true;
//     return this.firstStepForm;
//   }

//   get jobLocationCtrl(): FormControl {
//     return this.firstStepForm.get('jobForLocation') as FormControl;
//   }

//   get isMultLocation() {
//     return this.jobLocationCtrl.value == JOB_LOCATION_TYPE.MULTI;
//   }

//   get isSingleLocation() {
//     return this.jobLocationCtrl.value == JOB_LOCATION_TYPE.SINGLE;
//   }

// }

// export class FormGroupDirectiveOverride extends FormGroupDirective {
//   submitted: boolean;
// }