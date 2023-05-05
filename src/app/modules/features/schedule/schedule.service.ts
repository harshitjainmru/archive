import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { SCHEDULE_SHIFT_LIST, ADD_SCHEDULE } from 'src/app/constants/urls';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Injectable()
export class ScheduleService {

  constructor(
    private httpService:HttpService,
    private formBuilder: FormBuilder,
    private formService: FormService
  ) { }


  scheduleShiftListing(query, isImport = false) {
    // delete query.fromDate;
    // delete query.toDate;
    if(isImport){
      query = {...query,isImport:true}
    }
    return this.httpService.get(SCHEDULE_SHIFT_LIST, query, { showLoader: true });
  }


  createSingleScheduleGroup(){

  }

  createScheduleGroup(){
    return this.formBuilder.group({
      applicant:this.createSingleApplicantInfo(),
      timeSlots:this.formBuilder.array([]),
      shiftData:this.formBuilder.array([]),
      workingHours:new FormControl(''),
      totalShiftHours:this.formService.getControl('dropdown',true,0),
      isEdit:this.formService.getControl('dropdown',true,false),
      isSave:this.formService.getControl('dropdown',true,false),
      isImport:this.formService.getControl('dropdown',true,false),
      shiftId:this.formService.getControl('dropdown',false),
      timeline:this.formService.getControl('dropdown'),
      jobRole:this.formService.getControl('dropdown'),
      isActionedByUser:this.formService.getControl('dropdown',false,false),
      
    })
  }


  createSingleApplicantInfo(){
    return this.formBuilder.group({
      "userId": this.formService.getControl('dropdown'),
      "applyJobId": this.formService.getControl('dropdown'),
      "employerId": this.formService.getControl('dropdown'),
      "startOfWeek": this.formService.getControl('dropdown'),
      "endOfWeek": this.formService.getControl('dropdown'),
      "fullName":this.formService.getControl('dropdown'),
      "jobId":this.formService.getControl('dropdown'),
      "profileImage":this.formService.getControl('dropdown', false, ""),
      "employee_id":this.formService.getControl('dropdown'),
      "placement_id":this.formService.getControl('dropdown'),
      "email":this.formService.getControl('dropdown')

    })
  }

  createSingleTimeslotGroup(){
    return this.formBuilder.group({
      _id:this.formService.getControl('dropdown',false),
      startTime:this.formService.getControl('dropdown',false),
      endTime:this.formService.getControl('dropdown',false),
      title:this.formService.getControl('dropdown',false),
    })
  }

  createShiftDataForm(){
    return this.formBuilder.group({
      control:this.formService.getControl('dropdown'),
      list:this.formService.getControl('dropdown'),
      isDisabled:this.formService.getControl('dropdown',true,true),
    })
  }

  addScheule(body){
    return this.httpService.post(ADD_SCHEDULE,body, {skipErrorPopup:true}).toPromise()
  }
}
